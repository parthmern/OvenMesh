import React, { useEffect, useMemo, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { admin, url } from "../services/paths";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import moment from "moment";
import { SelectDemo } from "../components/core/adminPage/SelectDemo";
import { io } from "socket.io-client";

const AdminPage = () => {
  const { user } = useSelector((state) => state.profile);
  const [socketId, setSocketId] = useState(null);
  const [liveOrders, setLiveOrders] = useState([]);

  const socket = useMemo(() => {

    console.log("socket created");

    return(
      io.connect(url)
    )
  }, []);

  

  const fetchOrder = async () => {
    const toastId = toast.loading("Fetching live orders");
    try {
      const res = await apiConnector("POST", `${url}${admin}getAllLiveOrders`, user);
      setLiveOrders(res?.data?.filteredOrders || []);
      toast.success("Orders fetched successfully");
      toast.dismiss(toastId);
      return true;
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Order fetching failed");
      toast.dismiss(toastId);
      return false;
    }
  };

  useEffect(() => {
    
   
      const valid = fetchOrder();
      

      if (true) {
        console.log("initalizing socket ..");

        socket.on("connect", () => {
          console.log("skct connected");
          console.log(socket.id); // x8WIv7-mJelg7on_ALbx
          socket.emit("adminJoined", "admin");
        });

        socket.on("newOrderCreated", (data) => {
          console.log("✨🔌 Receiving newOrderCreated from server", data);
          setLiveOrders(data);
        });

        socket.on("disconnect", () => {
          console.log("🔌 Socket disconnected");
        });

        return () => {
          console.log("disconnected socket");
          socket.disconnect();
        };
      }
  
  }, []);

  const arrangingOrder = (user, orders) => {
    return orders?.map((order) => (
      <div key={order?._id} className="flex gap-x-5 border p-3">
        <div className="flex flex-col w-[300px] border-r-2 pr-5">
          <p>{order?._id}</p>
          <p className="text-black font-semibold">{user}</p>
        </div>

        <div className="flex w-[220px] flex-col border-r-2 pr-5">
          {order?.pizzas?.map((pizza) => (
            <div key={pizza?._id} className={pizza?._id}>
              <p>{pizza?.name}</p>
            </div>
          ))}
        </div>

        <div className="border-r-2 pr-5 w-[100px]">{moment(order?.createdAt).format("h.mm A")}</div>
        <div className="border-r-2 pr-5 w-[200px]">{order?.address}</div>
        <div className="border-r-2 pr-5 w-[100px]">${order?.totalCost}</div>
        <div className="w-[300px]">
          <SelectDemo id={order?._id} order={order} />
        </div>
      </div>
    ));
  };

  return (
    <div className="pt-16 p-8">
      {liveOrders && liveOrders.map((order) => arrangingOrder(order?.user, order?.orders))}
    </div>
  );
};

export default AdminPage;
