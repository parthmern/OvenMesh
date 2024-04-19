import React, { useEffect } from 'react'
import Navbar from '../components/common/Navbar';
import { apiConnector } from '../services/apiConnector';
import { allPizza, menu, url } from '../services/paths';
import { useSelector } from 'react-redux';

const HomePage = () => {

    const {user} = useSelector((state)=> state.profile) ;

    useEffect(()=>{
        async function gettingAllPizzas (){
            try{
                const res = await apiConnector("GET", url + menu + allPizza);
                console.log("res=>", res);
            }
            catch(error){
                console.log("error=>", error);
            }
            
        }
        gettingAllPizzas();
    }, []);

  return (

    <div>

        <Navbar />

    </div>

  )
}

export default HomePage ;