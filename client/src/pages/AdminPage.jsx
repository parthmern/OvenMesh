import React, { useEffect } from 'react'
import { apiConnector } from '../services/apiConnector';

const AdminPage = () => {

    useEffect(()=>{

        async function fetchOrder() {
            try{
                
                //const res = await apiConnector();

            }
            catch(error){

            }
        }
        fetchOrder();
    }, [])

  return (
    <div className='pt-16'>adminPage</div>
  )
}

export default AdminPage ;
