import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { Microwave } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {

    const navigate = useNavigate();

    const {user, loading} = useSelector((state)=>state.profile);
    console.log( {user, loading});

    console.log("redux nav user=>", user);

    const logoutHandling = () => {

        console.log("logout called");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logout done");
        window.location.reload();
    }

  return (
    <div className='w-[100%] fixed z-50 blur-effect px-3 h-[50px] border-b-2 flex items-center justify-between'>
        
        <div onClick={()=>{navigate("/")}} className='akira cursor-pointer flex items-center gap-x-2' >
            <Microwave />
            OvenMesh
        </div>

        <>
            {
                !user ? (
                    <div className='flex gap-x-5'>
                        <Button onClick={()=>{navigate("/login")}}>
                            Login
                        </Button>

                        <Button onClick={()=>{navigate("/signup")}}>
                            Signup
                        </Button>
                    </div>
                ) : (
                    <div className='flex items-center justify-center gap-x-3'>
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Badge className={"capitalize cursor-default "} variant="default">{user?.name}</Badge>

                        <Badge onClick={()=>{navigate("/myorder")}} className={"cursor-pointer "} variant="secondary">My orders</Badge>

                        <ShoppingCart onClick={()=> {navigate("/cart")}} className='ml-4 cursor-pointer ' />

                        <Button onClick={logoutHandling} className={"ml-8"} variant={"destructive"} >Logout</Button>

                        
                    </div>
                )
            }
        </>


        
        

    </div>
  )
}

export default Navbar ;