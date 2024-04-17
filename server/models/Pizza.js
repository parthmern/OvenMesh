const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({

    name : {
        type : String ,
    },

    img : {
        type : String ,
    },

    price : {
        type : Number ,
    },

    size : {
        type: String,
        enum: ['small', 'medium', 'large'],
    },

})

module.exports = mongoose.model("Pizza", pizzaSchema);
