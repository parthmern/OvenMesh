import React from 'react'

const MenuSection = ({pizzas}) => {
  return (
    <div>

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" >
            Menu
        </h1>

        {
            pizzas?.map((pizza)=>{
                return(
                    <div className='rounded border-[2px] h-[300px] w-[300px]'>
                        <p className="scroll-m-20 text-xl font-semibold tracking-tight">
                            {pizza.name}
                        </p>
                        <div>
                            <img src={pizza?.img} />
                        </div>
                    </div>  
                )
            })
        }


    </div>
  )
}


export default MenuSection ;