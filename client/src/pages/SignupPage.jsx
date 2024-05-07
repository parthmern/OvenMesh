import React, { useState } from 'react'
import { Button } from '../components/ui/button';
import InputWithLabelPass from '../components/ui/InputWithLabelPass';
import InputWithLabelEmail from '../components/ui/InputWithLabelEmail';
import InputWithLabelName from '../components/ui/InputWithLabelName';
import toast from 'react-hot-toast';
import { url, user } from '../services/paths';
import { apiConnector } from '../services/apiConnector';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log({name, email, password});

  async function signUpHandler(){

    const toastId = toast.loading("Trying to signup");
 
    console.log("signup clicked");
    
    try{

      const response = await apiConnector("POST", url + user + "signup", {name, email, password} );
      console.log("res=>", response);

      toast.success("Signup done");

      navigate("/login");
      

    }
    catch(error){
      console.log("error=>", error);
      toast.error(error?.response?.data?.message || "server error");

    }

    toast.dismiss(toastId);

  }

  return (
    <div className='md:w-[30%]  h-[90vh] w-[50%] mx-auto gap-y-5 flex flex-col items-center justify-center top-10 '>

        <div className='lexend-font text-4xl mb-5'>
          SIGN UP 
        </div>

        <InputWithLabelName setName={setName} name={"Name"} type={"text"} placeholder={"Enter your name"} /> 
        
        <InputWithLabelEmail setEmail={setEmail} name={"Email"} type={"email"} placeholder={"Email"} />

        <InputWithLabelPass setPassword={setPassword} name={"Password"} type={"password"} placeholder={"Password"} />


        <Button onClick={signUpHandler} variant="outline" >Create Account</Button>


      
    </div>
  )
}

export default SignupPage ;