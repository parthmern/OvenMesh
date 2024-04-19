import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const {user, loading} = useSelector((state)=>state.profile);
    console.log( {user, loading});


  return (
    <div className='w-[100%] flex items-center justify-between'>
        
        <div>
            OvenMesh
        </div>

        <>
            {
                !user ? (
                    <div>
                        <div onClick={()=>{navigate("/login")}}>
                            login
                        </div>

                        <div onClick={()=>{navigate("/signup")}}>
                            signup
                        </div>
                    </div>
                ) : (
                    <div>
                        
                    </div>
                )
            }
        </>


        
        

    </div>
  )
}

export default Navbar ;