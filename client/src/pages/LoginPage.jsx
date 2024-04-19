import React, { useState } from 'react'
import { Input } from '../components/ui/input';
import InputWithLabelEmail from '../components/ui/InputWithLabelEmail';

import { Button } from '../components/ui/button';
import InputWithLabelPass from '../components/ui/InputWithLabelPass';
import { apiConnector } from '../services/apiConnector';
import { login, url, user } from '../services/paths';
import toast from 'react-hot-toast';



const LoginPage = () => {

  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);

  

  async function loginHandle(){

    console.log({email,password});
    const toastId = toast.loading("Trying to login ...");
    
    try{
      
      const config = {
        headers: {
          "Content-Type": "application/json"
          },
          withCredentials: true
        }
      const response = await apiConnector("POST", url + user + login, {email, password}, config );
      console.log("res=>", response);

      localStorage.setItem("token", JSON.stringify(response.data.cookies.token));
      localStorage.setItem("user", JSON.stringify(response.data.findingUser));

      toast.success("Login Successful")

      

    }
    catch(error){
      console.log("error=>", error);
      toast.error("Login Failed")
    }

    toast.dismiss(toastId);

  }

  return (
    <div className='md:w-[30%] h-[90vh] w-[50%] mx-auto gap-y-5 flex flex-col items-center justify-center top-10 mt-10'>

        <div className='lexend-font text-4xl mb-5'>
          LOGIN 
        </div>

        {/* <InputWithLabel name={"Name"} type={"text"} placeholder={"Enter your name"} /> */}
        
        <InputWithLabelEmail setEmail={setEmail} name={"Email"} type={"email"} placeholder={"Email"} />

        <InputWithLabelPass setPassword={setPassword} name={"Password"} type={"password"} placeholder={"Password"} />

        <Button onClick={loginHandle} variant="default" >Login Now</Button>
      
    </div>
  )
}

export default LoginPage ;
