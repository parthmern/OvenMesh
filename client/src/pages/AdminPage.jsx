import React, { useEffect, useMemo, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { admin, order, url } from "../services/paths";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import moment from "moment";
import { SelectDemo } from "../components/core/adminPage/SelectDemo";
import { io } from "socket.io-client";

const AdminPage = () => {
  const { user } = useSelector((state) => state.profile);


  //=======================================================================

  const [socketId, setSocketId] = useState();

  const socket = useMemo(() => {
    return io(url);
  }, []);

  // useEffect(() => {
  //   console.log("use effect run");
  //   socket.on("connect", () => {
  //     console.log("✨✨✨✨✨ADMIN - connected with id", socket.id);
  //     setSocketId(socket.id);

  //     socket.emit("adminJoined", "admin");

  //   });

  //   // receving emitted from server
  //   socket.on("newOrderCreated", (data) => {
  //     console.log("✨🔌 receving newOrderCreated from server ", data);
  //     setLiveOrders(data);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  //=======================================================================


  const [liveOrders, setLiveOrders] = useState();

  useEffect(() => {
    async function fetchOrder() {
      var toastId = toast.loading("Fetching live orders");
      try {
        const res = await apiConnector(
          "POST",
          url + admin + "getAllLiveOrders",
          user
        );
        console.log("res->", res?.data?.filteredOrders);
        setLiveOrders(res?.data?.filteredOrders);
        toast.success("Order fetched successfully");
        toast.dismiss(toastId);
        return true ;
      } catch (error) {
        console.log("error", error);
        toast.error("Order fetching failed");
        toast.dismiss(toastId);
        return false ;
      }
      
    }

    async function socketConnection(){
      const valid = await fetchOrder();
    console.log("valid->", valid);

    if(valid){
      socket.on("connect", () => {
        console.log("✨✨✨✨✨ADMIN - connected with id", socket.id);
        setSocketId(socket.id);
  
        socket.emit("adminJoined", "admin");
  
      });
  
      // receving emitted from server
      socket.on("newOrderCreated", (data) => {
        console.log("✨🔌 receving newOrderCreated from server ", data);
        setLiveOrders(data);
      });
  
      return () => {
        socket.disconnect();
      };
    }
    }

    socketConnection();
    




  }, []);

  function arrangingOrder(user, orders) {
    console.log(user);

    return orders?.map((order) => {
      return (
        <div key={order?._id} className="flex gap-x-5 border p-3">
          <div className="flex flex-col w-[300px] border-r-2 pr-5">
            <p>{order?._id}</p>
            <p className="text-black font-semibold">{user}</p>
          </div>

          <div className="flex w-[220px] flex-col border-r-2 pr-5">
            {order?.pizzas?.map((pizza) => {
              return (
                <div key={pizza?._id} className={pizza?._id}>
                  <p>{pizza?.name}</p>
                </div>
              );
            })}
          </div>

          <div className="border-r-2 pr-5 w-[100px] ">{moment(order?.createdAt).format("h.mm A")}</div>

          <div className="border-r-2 pr-5 w-[200px] ">{order?.address}</div>

          <div className="border-r-2 pr-5 w-[100px] ">${order?.totalCost}</div>

          <div className="w-[300px]">
            <SelectDemo id={order?._id} order={order} />
          </div>


        </div>
      );
    });
  }

  return (
    <div className="pt-16 p-8">
      {liveOrders &&
        liveOrders?.map((order) => {
          return arrangingOrder(order?.user, order?.orders);
        })}
    </div>
  );
};

export default AdminPage;
