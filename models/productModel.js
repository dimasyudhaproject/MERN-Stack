const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Products", productSchema)