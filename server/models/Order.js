const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    status: {
        type: String,
        enum: ['placed', 'confirmation', 'preparation', 'outForDelivery', 'delivered'],
    },

    createdAt : {
        type: Date ,
        default : Date.now(),
    },

    time: [{
        type: Date, // Array of dates to store timestamps
    }],

    address : {
        type : String ,
    },

    totalCost : {
        type : Number ,
    },

    pizzas : [
        {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Pizza",
		},
    ],

});

// Middleware to update the time array when status is updated
orderSchema.pre('save', function (next) {
    if (this.isModified('status')) {
        // Push the current time to the time array
        this.time.push(new Date());
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
