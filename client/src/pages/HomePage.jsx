import React, { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar';
import { apiConnector } from '../services/apiConnector';
import { allPizza, menu, url } from '../services/paths';
import { useSelector } from 'react-redux';
import MenuSection from '../components/core/HomePage/MenuSection';

const HomePage = () => {

    const {user} = useSelector((state)=> state.profile) ;

    const [pizzas, setPizzas] = useState(null);

    useEffect(()=>{
        async function gettingAllPizzas (){
            try{
                const res = await apiConnector("GET", url + menu + allPizza);
                console.log("res=>", res);
                setPizzas(res?.data?.allPizzas);
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

        <MenuSection pizzas={pizzas}  />

    </div>

  )
}

export default HomePage ;