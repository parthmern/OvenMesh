
const User = require("../models/User");

const getAllLiveOrders = async (req, res) =>{

    try{

        const allUser = await User.find({}).populate({
            path: 'orders',
            populate: {
                path: 'pizzas'
            }
        });
        

        console.log("all user->", allUser);

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

        return(
            res.status(200).json(
                {
                    success : true,
                    message : "Live order generated",
                    filteredOrders
                }
            )
        )
    }
    catch(error){
        console.log("🚫 getAllLiveOrders error =>", error);
        return(
            res.status(500).json(
                {
                    success : false,
                    message : "Error in getAllLiveOrders",
                    error,
                }
            )
        )
    }

}


module.exports = {getAllLiveOrders};