//Work in progress not the final version
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    user_file_name : String,
    system_file_name : String,
    type : String,
    size : Number,
    key : String,
    file_iv : String,
    parent_directory : String,
    created_at : {type: Date, default: Date.now},
    permitted_users : Array,
    access_level : String
});

const File = mongoose.model("File", FileSchema);
