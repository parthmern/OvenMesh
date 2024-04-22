import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiConnector';
import { order, url } from '../services/paths';

const MyOrder = () => {

    const [orders, setOrders] = useState();

    useEffect(()=>{

        async function fetchingOrders(){

            try{

                const res = await apiConnector(url+order);

                

            }
            catch(error){
                console.log("feching order error=>", error);
            }
        }

    }, []);

  return (
    <div>

    </div>
  )
}

export default MyOrder ;