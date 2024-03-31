
function errorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    console.error(err.stack);
    res.status(err.statusCode).send({
        status: err.status,
        message: err.message
    });
}

module.exports = {
    errorHandler
};