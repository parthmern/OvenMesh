const { default: mongoose } = require("mongoose");
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const User = require("../models/User");


// ===================================
// createOrder for first time
const createOrder = async (req, res) =>{

    try{

        const {userId} = req.body ;

        if(!userId){
            console.log(" 🚫 User Id is not available");
            return(
                res.status(400).json({
                    success : false, 
                    message : "User Id is not available",
                })
            )
        }

        const isUserAvailable = await User.findById(userId);

        if(!isUserAvailable){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "User not available",
                    }
                )
            )
        }

        const {address} = req.body ;
        const pizzasIds = req.body.pizzas ;

        // fixed
        const status = "placed" ;

        console.log("userid, address, pizzaIds=>", userId, address, pizzasIds);

        let totalCost = 0;
        for(const pizzaId of pizzasIds){
            console.log("for id->", pizzaId);
            
            if(mongoose.Types.ObjectId.isValid(pizzaId)){

                const validatingPizzaId = await Pizza.findById(
                    pizzaId
                );
                console.log("validaing==>", validatingPizzaId);
                
                if(!validatingPizzaId){
                    return(
                        res.status(400).json(
                            {
                                success : "false" ,
                                message : `${validatingPizzaId} pizza not available`
                            }
                        )
                    )
                    break ;
                }

                totalCost = totalCost + validatingPizzaId?.price;
            }else{
                console.log("🚫 mongoose id invalid ");
                return(
                    res.status(400).json(
                        {
                            success : "false" ,
                            message : "Mongoose id invalid" ,
                        }
                    )
                )
            }
            

        }
        console.log("total cost =>", totalCost);

        const createdOrder = await Order.create(
            {
                status : "placed" ,
                address ,
                status,
                totalCost ,
                pizzas : pizzasIds ,
            }
        );

        console.log("✅ Order created successfully =>", createdOrder);

        const addingOrderIdToUser = await User.findByIdAndUpdate(
            {_id : userId},
            {
                $push :{
                    orders : createdOrder._id,
                }
            },
            {
                new : true 
            },
        );

        console.log("✅ addingOrderIdToUser =>", addingOrderIdToUser);

        return(
            res.status(200).json(
                {
                    success : true,
                    message : "Order created successfully",
                    createdOrder,
                    addingOrderIdToUser,
                }
            )
        )

   
    }
    catch(error){
        console.log("🚫 createOrder error=>", error);

        return(
            res.status(500).json(
                {
                    success : false,
                    message : "Order creation failed",
                }
            )
        )

    }

}

// ====================================
// updating order status
const updateOrderStatus = async(req, res) =>{
    try{

        const {orderId} = req.body ;
        const {status} = req.body ;

        // coming through isOrderExist or not MIDDLEWARE
        // so no need to check

        

        const updatedStatus = await Order.findByIdAndUpdate(
            {_id : orderId},
            {
                status : status,
            },
            {
                new : true ,
            }
        )

        console.log("✅ Order status updated successfully");

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "Order status updated successfully",
                    updatedStatus ,
                }
            )
        )
        

    }
    catch(error){
        console.log("🚫 updaing order status failed =>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "Order status updation failed",
                    error,
                }
            )
        )
    }
}

// ====================================
// cancelOrder
const cancelOrder = async (req, res) =>{
    try{

        const {orderId} = req.body ;
        console.log("orderId=>", orderId);

        
        if(!orderId){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "orderId required",
                    }
                )
            )
        }

        
        

    }
    catch(error){
        console.log("")
    }
}

module.exports = {
    createOrder,
    updateOrderStatus
};