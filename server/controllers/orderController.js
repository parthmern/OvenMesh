const { default: mongoose } = require("mongoose");
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const User = require("../models/User");
const io = require("../index")



// ===================================
// createOrder for first time
const createOrder = async (req, res) =>{

    try{

        console.log("req.body.user=>", req.body.user);

        const {id : userId} = req.body.user ;

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

        //console.log("✅ addingOrderIdToUser =>", addingOrderIdToUser);

        // ================================================================
        
        const allUser = await User.find({}).populate({
            path: 'orders',
            populate: {
                path: 'pizzas'
            }
        });
        

        //console.log("all user->", allUser);

        const liveOrder = allUser.map((user)=>{
            console.log(user.orders.filter((order)=>{
                return(
                    order?.status !== 'delivered'
                )
            }));
            return(
                user.orders.filter((order)=>{
                    return(
                        order?.status !== 'delivered'
                    )
                })
            )
        });

        const filteredOrders = allUser.reduce((accumulator, user) => {
            const filteredUserOrders = user.orders.filter(order => order.status !== "delivered");
            if (filteredUserOrders.length > 0) {
                accumulator.push({ user: user.name, orders: filteredUserOrders });
            }
            return accumulator;
        }, []);
        
        //console.log(filteredOrders);

        io.to("admin").emit('newOrderCreated', filteredOrders);
        console.log("emitting new order");

        // =================================================================


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

        io.to(orderId).emit('updateOrderStatus', {
            status : updatedStatus?.status ,
            time : updatedStatus?.time ,
        });

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

// ====================================
const getAllOrders = async (req, res) =>{

    try{

        const {id : userId} = req.body.user ;

        if(!userId){
            console.log(" 🚫 User Id is not available");
            return(
                res.status(400).json({
                    success : false, 
                    message : "User Id is not available",
                })
            )
        }

        const isUserAvailable = await User.findById(userId).populate("orders");

        console.log("isUserAvailable=>", isUserAvailable);

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "Orders fetched successfully",
                    isUserAvailable ,
                }
            )
        )



        

    }
    catch(error){
        console.log("🚫 getAll orders failed =>", error);
        return(
            res.status(500).json(
                {
                    success : false,
                    message : "Getting all orders failed",
                    error,
                }
            )
        )
    }
}

const getOrderDetail = async (req, res)=>{
    try{

        const {orderId} = req.body ;

        console.log("order id->", orderId);

        const orderDetail = await Order.findById(orderId).populate("pizzas");

        console.log("order details->",orderDetail);

        if(!orderDetail){
            console.log("🚫 order detail not found");
            return(
                res.status(400).json(
                    {
                        success : false,
                        message : "order detail not found"
                    }
                )
            )
        }

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "Order details founded",
                    orderDetail ,
                }
            )
        )


    }
    catch(error){
        console.log("🚫 getOrderDetails error=>", error);
        return(
            res.status(500).json(
                {
                    success : false,
                    message : "Failed to Get order details",
                    error,
                }
            )
        )
    }
}


module.exports = {
    createOrder,
    updateOrderStatus,
    getAllOrders,
    getOrderDetail
};