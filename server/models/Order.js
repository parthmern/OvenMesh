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

    time: [
        {
            status: {
                type: String,
                enum: ['placed', 'confirmation', 'preparation', 'outForDelivery', 'delivered'],
                required: true 
            },
            updatedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],

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
// orderSchema.pre('findOneAndUpdate', function (next) {
//     const updatedFields = this.getUpdate();
//     if (updatedFields && updatedFields.status) {
//         console.log("Status updating =>", updatedFields.status);
//         this.updateOne({ $push: { time: new Date() } });
//     }
//     next();
// });

orderSchema.pre('findOneAndUpdate', function (next) {
    const updatedFields = this.getUpdate();
    if (updatedFields && updatedFields.status) {
        const newTime = {
            status: updatedFields.status,
            updatedAt: new Date()
        };
        this.updateOne({ $push: { time: newTime } });
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
