import {createSlice} from "@reduxjs/toolkit"
import  toast from "react-hot-toast";


const initialState = {
    cart : [],
    total : 0,
    totalItem : 0 ,
}

const cartSlice = createSlice(
    {
        name : "cart",
        initialState : initialState ,
        reducers : {

           addToCart : (state, action) =>{
            const pizza = action.payload ;
            console.log("pizza");
            const index = state.cart.findIndex((item)=> item._id === pizza._id);

            if(index>=0){
                toast.error("Already in cart");
                return ;
            }

            state.cart.push(pizza);
            state.total += pizza.price ; 
            state.totalItem ++ ;

            toast.success("Pizza added in cart");

           }
        }


    }
)

export const {addToCart} = cartSlice.actions ;
export default cartSlice.reducer ;

