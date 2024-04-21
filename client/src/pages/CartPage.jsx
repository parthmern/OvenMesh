import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";

const CartPage = () => {
  const { cart, total, totalItem } = useSelector((state) => state.cart);

  console.log("🛒 cart=>", cart);

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

                    <div>${pizza?.price}</div>
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
            <Button className="w-full">Proceed to Checkout</Button>
          </div>
        </div>
      ) : (
        <p>empty cart</p>
      )}
    </div>
  );
};

export default CartPage;
