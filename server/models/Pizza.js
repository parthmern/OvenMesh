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
        
    },

})

module.exports = mongoose.model("Pizza", pizzaSchema);
