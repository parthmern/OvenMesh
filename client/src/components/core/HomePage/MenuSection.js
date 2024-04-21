import React from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

const MenuSection = ({ pizzas }) => {
  return (
    <div className="p-6 ">
      <div className="text-center my-5">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Our Delicious Pizza Menu
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
          Explore our selection of handcrafted pizzas made with the freshest
          ingredients.
        </p>
      </div>

      <div className="flex flex-wrap gap-y-4 items-center justify-center gap-x-5">
        {pizzas?.map((pizza) => {
          return (
            <div className="group relative rounded-lg border  border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  alt="Margherita Pizza"
                  className="h-[300px] w-full object-cover transition-all group-hover:scale-105"
                  height="300"
                  src={pizza?.img}
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width="400"
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <h3 className="text-lg  lexend-font font-bold tracking-tight">
                  {pizza?.name}
                </h3>
                <p className="text-sm capitalize font-semibold text-gray-500 dark:text-gray-400">
                  {pizza?.size}
                </p>
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">${pizza?.price}</p>
                    <Button >Add to Cart</Button>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuSection;
