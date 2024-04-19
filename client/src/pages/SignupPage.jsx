import React from 'react'
import InputWithLabel from '../components/ui/InputWithLabelEmail';
import { Button } from '../components/ui/button';

const SignupPage = () => {
  return (
    <div className='md:w-[30%] h-[90vh] w-[50%] mx-auto gap-y-5 flex flex-col items-center justify-center top-10 mt-10'>

        <div className='lexend-font text-4xl mb-5'>
          SIGN UP 
        </div>

        <InputWithLabel name={"Name"} type={"text"} placeholder={"Enter your name"} /> 
        
        <InputWithLabel name={"Email"} type={"email"} placeholder={"Email"} />

        <InputWithLabel name={"Password"} type={"password"} placeholder={"Password"} />

        <Button variant="outline" >Create Account</Button>


      
    </div>
  )
}

export default SignupPage ;