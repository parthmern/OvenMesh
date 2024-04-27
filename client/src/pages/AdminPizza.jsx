import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiConnector';
import { menu, url } from '../services/paths';
import { Button } from '../components/ui/button';
import toast from 'react-hot-toast';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';


const AdminPizza = () => {

    const [allPizza, setAllPizza] = useState();

    const [deletePizza, setDeletePizza] = useState();

    async function fetchingAllOrders(){
        const toastId = toast.loading("Getting all pizzas");
        try{

            const res = await apiConnector("GET", url+menu+"allPizza");
            console.log("res=>", res);
            setAllPizza(res?.data?.allPizzas);
            toast.success("All pizza fetched successfully");
        }
        catch(error){
            console.log("error in fetchingAllOrders=>>", error);
            toast.error("Pizza feetched error");

        }
        toast.dismiss(toastId);
    }

    useEffect(()=>{

        fetchingAllOrders();

    }, [deletePizza])


  return (
    <div className='pt-16'>
        <div className='ml-5 lexend-font text-3xl font-bold '>
            All Pizzas
        </div>

        <div className='border p-3 m-5 rounded-lg'>
            <div>
                <Label>Pizza Name</Label>
                <Input ></Input>
            </div>
        </div>

        <div className='border p-3 m-5 rounded-lg'>
            {
                allPizza && (
                    allPizza.map((pizza)=>{
                        return(
                            <div key={pizza?._id} className='flex flex-col gap-y-2 border p-3 m-5 rounded-lg'>
                                <div>Pizza Id : {pizza?._id}</div>
                                <div>Name : {pizza?.name}</div>
                                <div>Description : {pizza?.size}</div>
                                <div>Price : $ {pizza?.price}</div>
                                <div className='w-[150px] '>
                                    <img src={pizza?.img} />
                                </div>
                                <Button id={pizza?._id} onClick={async (e)=>{
                                    console.log("id", e?.target?.id);
                                    try{
                                        const response = await apiConnector("DELETE", url+menu+"deletePizza", {pizzaId: e?.target?.id });
                                        console.log("response ->", response);
                                        toast.success(`Pizza deleted ${e?.target?.id}`);
                                        setDeletePizza(e?.target?.id);
                                    }
                                    catch(error){
                                        console.log("error in deleting pizza", error);
                                        toast.error("error in deleting pizza")
                                    }
                                }} className="w-[300px]" variant="destructive"> Delete </Button>
                            </div>
                        )
                    })
                )
            }
        </div>

    </div>
  )
}

export default AdminPizza;
