import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { order, url } from "../services/paths";
import OrderTable from "../components/core/myorderPage/OrderTable";
import toast from "react-hot-toast";

const MyOrder = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false) ;


  function getWithExpiry(key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
        return null;
    }
    const item = JSON.parse(itemString);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

  const token = getWithExpiry("token");
  console.log("token->", token);

  useEffect(() => {

    async function fetchingOrders() {
      setLoading(true);
      const config = {
        Authorization: `Bearer ${token}`,
      };

      //toast.loading("creating order ...");
      try {
        const res = await apiConnector("GET", url + order + "getAllOrder", "",config);
        console.log("res", res?.data?.isUserAvailable?.orders);
        setOrders(res?.data?.isUserAvailable?.orders);
      } catch (error) {
        console.log("feching order error=>", error);
      }
      setLoading(false);
    }
    fetchingOrders();
  }, []);

  return (
    <div className="pt-16 p-5">
      
        <h1 className="ml-5 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          My Orders
        </h1>
        <div className="p-5 border rounded m-6">
            <OrderTable orders={orders}  loading={loading}  />
        </div>
           
    </div>
  );
};

export default MyOrder;
