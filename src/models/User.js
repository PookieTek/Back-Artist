const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean
    },
    code: {
        type: Number
    },
    savedpost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }]
}, {
    collection: 'users',
})

const User = mongoose.model('users', UserSchema, 'users') 
module.exports = User