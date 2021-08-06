const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)