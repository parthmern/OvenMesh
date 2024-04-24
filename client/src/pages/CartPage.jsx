import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import InputWithLabelEmail from "../components/ui/InputWithLabelEmail";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { createOrder, order, url } from "../services/paths";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

  const navigate = useNavigate(); 

  const [address, setAddress] = useState();
  const [phoneNum, setPhoneNum] = useState();

  const { cart, total, totalItem } = useSelector((state) => state.cart);
  const { user } = useSelector((state)=> state.profile) ;

  const token = JSON.parse(localStorage.getItem("token"));
  console.log("token->", token);

  //console.log("add=>", address);

  console.log("🛒 cart=>", cart);


  const orderHandler = async () => {

    if(!address || !phoneNum){
      toast.error("Enter address and phone number");
      return ;
    }

    
    const toastId = toast.loading("Creating order ...");
    try{

      const pizzas = [] ;

      for (const pizza of cart){
        console.log("id->", pizza?._id);
        pizzas.push(pizza?._id);
      }
      

      const orderDetails = {
        pizzas : pizzas ,
        address : address ,
        status : "placed",
        phoneNum : phoneNum ,
      }

      const config = {
        
        'Authorization': `Bearer ${token}` ,
    
      };

      const response = await apiConnector( "POST",url+order+createOrder, orderDetails, config);
      console.log("response->", response);

      toast.success("Order created Successful");
      navigate("/myorder");

    }
    catch(error){
      console.log("error->", error);
      toast.error(error?.response?.data?.message || "server error");
    }

    toast.dismiss(toastId);

  }


  return (
    <div className="container py-4">
      <h1 className=" text-3xl font-bold mb-6">Your Cart</h1>

      { !(cart<=0) ? (
        <div className="flex w-full item-center justify-between ">
          <div>
            {cart?.map((pizza) => {
              return (
                <div className="flex mt-4 w-[200%] items-center justify-between border-b pb-6">
                  <div className=" flex w-full justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden">
                        <img
                          alt="Pizza"
                          className="w-full h-full object-cover"
                          src={pizza?.img}
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">{pizza?.name}</h3>
                        <p className="text-gray-500">{pizza?.size}</p>
                      </div>
                    </div>

                    <div className="font-medium">${pizza?.price}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 lg:w-96 space-y-4">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <div className="flex items-center justify-between">
              <p>Total Items</p>
              <p className="font-medium">{totalItem}</p>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <p className="text-lg font-medium">Total</p>
              <p className="text-lg font-medium">${total}</p>
            </div>

            <div className="py-4 flex  flex-col gap-y-3">
              <InputWithLabelEmail className='py-5 pb-3' setPhoneNum={setPhoneNum} name={"Enter Phone Number"} type={"text"} placeholder={"Enter Phone Number"} />
              <InputWithLabelEmail className='py-5' setEmail={setAddress} name={"Enter delivery address"} type={"text"} placeholder={"Enter address"} />
            </div>
            

            <Button onClick={orderHandler} className="w-full">Proceed to Checkout</Button>
          </div>
        </div>
      ) : (
        <p>empty cart</p>
      )}
    </div>
  );
};

export default CartPage;
