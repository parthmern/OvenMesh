import React, { useState } from 'react'
import { Input } from '../components/ui/input';
import InputWithLabelEmail from '../components/ui/InputWithLabelEmail';

import { Button } from '../components/ui/button';
import InputWithLabelPass from '../components/ui/InputWithLabelPass';
import { apiConnector } from '../services/apiConnector';
import { login, url, user } from '../services/paths';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../toolkit/slices/profileSlice';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {

  const dispatch = useDispatch();

  const {user:s} = useSelector((state)=> state.profile);
  console.log("redux user", s);

  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null); 

  const navigate = useNavigate();

  

  async function loginHandle(){

    console.log({email,password});
    const toastId = toast.loading("Trying to login ...");
    
    try{
      
      const config = {
        
          "Content-Type": "application/json",
          
          "withCredentials": true
        }
      const response = await apiConnector("POST", url + user + login, {email, password}, config );
      console.log("res=>", response);

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // Function to set item in localStorage with expiration time
      function setWithExpiry(key, value, ttl) {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl // Expiration time in milliseconds
        };
        localStorage.setItem(key, JSON.stringify(item));
      }

      const tokenExpiry = 24 * 60 * 60 * 1000; // 24 hours
      const userExpiry = 24 * 60 * 60 * 1000; // 24 hours


      setWithExpiry("token", response.data.cookies.token, tokenExpiry);
      setWithExpiry("user", response.data.findingUser, userExpiry);


      //localStorage.setItem("token", JSON.stringify(response.data.cookies.token));
      //localStorage.setItem("user", JSON.stringify(response.data.findingUser));

      // Function to set a cookie
					function setCookie(name, value, days) {
						const twentyFourHours = 24 * 60 * 60 * 1000;
  					const expires = new Date(Date.now() + twentyFourHours).toUTCString();
						
						document.cookie = `${name}=${value}; expires=${expires}; path=/`;
					}
  
			// Usage example
			setCookie('token',JSON.stringify(response.data.cookies.token)); // Sets a cookie named 'myCookie' that expires in 7 days

      
      toast.success("Login Successful");

      dispatch(setUser(response.data.findingUser));

      navigate("/")
      

    }
    catch(error){
      console.log("error=>", error);
      toast.error(error?.response?.data?.message || "server error");
    }

    toast.dismiss(toastId);


  }

  return (
    <div className='md:w-[30%] h-[90vh] w-[50%] mx-auto gap-y-5 flex flex-col items-center justify-center '>

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
