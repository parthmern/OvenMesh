import React from 'react'
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

const MenuSection = ({pizzas}) => {
  return (
    <div className='p-6 '>

        <h1 className="scroll-m-20 mb-5 text-4xl font-extrabold tracking-tight lg:text-5xl" >
            Menu
        </h1>

        <div className='flex gap-x-5'>
            {
                pizzas?.map((pizza)=>{
                    return(
                        <div className='py-6 flex flex-col items-center justify-center rounded border-[2px] w-[300px]'>
                            
                            {/* <p className="scroll-m-20 text-xl font-semibold tracking-tight">
                                {pizza.name}
                            </p> */}
                            <div className=''>
                                <img className='w-[200px]' src={pizza?.img} />
                            </div>

                            <div className='flex mt-3 items-center justify-center flex-col gap-y-3'>
                                <Badge className={"uppercase w-fit font-xl cursor-default "} variant="default">{pizza?.name}</Badge>

                                <Badge className={"capitalize w-fit font-xl cursor-default "} variant="secondary">{pizza?.size}</Badge>

                                <div className='flex items-center justify-center gap-x-5'>
                                    <Badge className={"uppercase text-[20px] cursor-default "} variant="outline">${pizza?.price}</Badge>
                                    <Button>Add to Cart</Button>
                                </div>
                            </div>

                            

                        </div>  
                    )
                })
            }
        </div>


    </div>
  )
}


export default MenuSection ;