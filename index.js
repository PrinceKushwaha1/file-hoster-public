const express = require('express');
const https = require('https');
const fs = require('fs');
const dbClient = require(__dirname + '/dbConnection');
const { v4: guid } = require('uuid');
const multer = require('multer');
const authRoutes = require(__dirname + '/routes/authRoutes');
const userRoutes = require(__dirname + '/routes/userRoutes');
const errorHandlers = require(__dirname + '/middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function startServer() {
    //Database connection
    try {
        await dbClient.connect();
    } catch (err) {
        console.error('Failed to connect to the database. Exiting...', err);
        process.exit(1);
    }

    process.on('SIGINT', async () => {
        await dbClient.disconnect();
        process.exit(0);
    });

    app.get('/', (req, res, next) => {
        res.sendFile(__dirname + '/public/form.html');
        next(errorHandlers.notFoundError("Page not found"));
    });

    //Authentication API
    app.use("/auth", authRoutes);

    //User API
    app.use("/user", userRoutes);

    //File API
    app.post("/upload", upload.single('uploadFile'), async (req, res) => {
        console.log(req.body);
        console.log(req.file);
        const error = false;
        const encryptedBuffer = encryptFile.encryptFile(req.file.buffer);

        console.log('encryptionKey : ' + encryptedBuffer.key);
        const fileName = guid();

        fs.writeFileSync(__dirname + '/storage/' + fileName + '.enc', encryptedBuffer.encryptedFileBuffer, (err) => {
            if (err) {
                console.log("File writing failed");
                error = true;
            } else {
                console.log("file uploaded");
            }
        });

        if (error) {
            res.status(500).send("File Upload failed");
        } else {
            res.send("File uploaded");
        }
    });

    //Error handling
    app.use(errorHandlers.errorHandler);

    const secureServer = https.createServer({
        "key": fs.readFileSync(__dirname + "/cert/httpskey.pem"),
        "cert": fs.readFileSync(__dirname + "/cert/httpscert.pem")
    }, app);

    secureServer.listen(3554, console.log("secure server running on 3554"));
}

startServer();