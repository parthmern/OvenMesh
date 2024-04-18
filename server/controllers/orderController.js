const { default: mongoose } = require("mongoose");
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const User = require("../models/User");



const createOrder = async (req, res) =>{

    try{

        const {userId} = req.body ;
        const {address} = req.body ;
        const pizzasIds = req.body.pizzas ;

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
                totalCost ,
                pizzas : pizzasIds ,
            }
        );

        console.log("✅ Order created successfully =>", createdOrder);

        const addingOrderIdToUser = await User.findByIdAndUpdate(
            {userId},
            {
                $push :{
                    orders : createOrder._id,
                }
            },
            {
                new : true 
            },
        );

        console.log("✅ addingOrderIdToUser =>", addingOrderIdToUser);



        
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

module.exports = {
    createOrder 
};