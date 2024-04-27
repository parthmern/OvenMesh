import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { admin, order, url } from "../services/paths";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import moment from "moment";
import { SelectDemo } from "../components/core/adminPage/SelectDemo";

const AdminPage = () => {
  const { user } = useSelector((state) => state.profile);


  function onStatusChnage(){

  }

  const [liveOrders, setLiveOrders] = useState();

  useEffect(() => {
    async function fetchOrder() {
      const toastId = toast.loading("Fetching live orders");
      try {
        const res = await apiConnector(
          "POST",
          url + admin + "getAllLiveOrders",
          user
        );
        console.log("res->", res?.data?.filteredOrders);
        setLiveOrders(res?.data?.filteredOrders);
        toast.success("Order fetched successfully");
      } catch (error) {
        console.log("error", error);
        toast.error("Order fetching failed");
      }
      toast.dismiss(toastId);
    }

    fetchOrder();
  }, []);

  function arrangingOrder(user, orders) {
    console.log(user);

    return orders?.map((order) => {
      return (
        <div className="flex gap-x-5 border p-3">
          <div className="flex flex-col border-r-2 pr-5">
            <p>{order?._id}</p>
            <p className="text-black font-semibold">{user}</p>
          </div>

          <div className="flex w-[200px] flex-col border-r-2 pr-5">
            {order?.pizzas?.map((pizza) => {
              return (
                <>
                  <p>{pizza?.name}</p>
                  
                </>
              );
            })}
          </div>

          <div className="border-r-2 pr-5 w-[100px] ">{moment(order?.createdAt).format("h.mm A")}</div>

          <div className="border-r-2 pr-5 w-[200px] ">{order?.address}</div>

          <div className="border-r-2 pr-5 w-[100px] ">${order?.totalCost}</div>

          <div>
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
