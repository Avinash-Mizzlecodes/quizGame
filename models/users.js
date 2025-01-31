const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    dob:String,
    gName:String,
    gEmail:String,
    gPhone:String,
    ageGroup:String
});

module.exports = mongoose.model('users', usersSchema);
