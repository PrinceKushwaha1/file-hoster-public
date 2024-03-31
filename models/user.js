const mongoose = require('mongoose');
const { stringify } = require('uuid');

const UserSchema = new mongoose.Schema({
    username : {type:String, required: true, unique: true, lowercase: true},
    password : {type:String, required: true},
    display_name : String,
    email : String,
    created_at : {type:Date, default: Date.now},
    premium_level : {type:Number, default: 0}
});

module.exports = mongoose.model("User", UserSchema);