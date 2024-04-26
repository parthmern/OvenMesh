import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiConnector';
import { admin, url } from '../services/paths';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const AdminPage = () => {

  const {user} = useSelector((state)=> state.profile);

  const [liveOrders, setLiveOrders] = useState();

    useEffect(()=>{

        async function fetchOrder() {
          const toastId = toast.loading("Fetching live orders");
            try{
                
                const res = await apiConnector("POST", url+admin+"getAllLiveOrders", user );
                console.log("res->", res?.data?.filteredOrders);
                setLiveOrders(res?.data?.filteredOrders);
                toast.success("Order fetched successfully");
            }
            catch(error){
              console.log("error", error);
              toast.error("Order fetching failed");
            }
            toast.dismiss(toastId);
        }

        fetchOrder();
    }, [])

  return (
    <div className='pt-16'>adminPage</div>
  )
}

export default AdminPage ;
