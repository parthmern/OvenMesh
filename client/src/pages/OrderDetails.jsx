import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { order, url } from "../services/paths";
import {io} from "socket.io-client"

import { TicketCheck } from 'lucide-react';
import { PackageCheck } from 'lucide-react';
import { Pizza } from 'lucide-react';
import { Truck } from 'lucide-react';
import { SquareCheckBig } from 'lucide-react';
import { Progress } from "../components/ui/progress";


const OrderDetails = () => {

    const [orderStatus, setOrderStatus] = useState();

  //==========================
  const [socketId, setSocketId] = useState();

  const socket = useMemo(() => {
    return io("http://localhost:4000");
  }, []);

  useEffect(() => {
    console.log("use effect run");
    socket.on("connect", () => {
      console.log("✨🔌connected with id", socket.id);
      setSocketId(socket.id);

      socket.emit("userJoinedWithOrderId", id);

    });

    // receving emitted from server
    socket.on("updateOrderStatus", (data) => {
      console.log("✨🔌 receving updateOrderStatus from server ", data);
      setOrderStatus(data);
    });



    return () => {
      socket.disconnect();
    };
  }, []);

  //========================

  const { id } = useParams();

  const [detail, setDetail] = useState();

  useEffect(() => {
    async function gettingOrderDetails() {
      try {
        const res = await apiConnector("POST", url + order + "getOrderDetail", {
          orderId: id,
        });
        console.log("res=>", res?.data?.orderDetail);
        setDetail(res?.data?.orderDetail);
        setOrderStatus(res?.data?.orderDetail?.status);
      } catch (error) {
        console.log("error=>", error);
      }
    }
    gettingOrderDetails();
  }, [id]);



  function calculateProgress(orderStatus) {
    switch (orderStatus) {
      case 'placed':
        return 7;
      case 'confirmation':
        return 28;
      case 'preparation':
        return 52;
      case 'outForDelivery':
        return 75;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  }

  return (
    <div className="p-5 flex flex-col w-full">
        {/* <p>{detail?.status}{orderStatus}</p> */}


        <h1 className="mb-5  text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Order Details
        </h1>


      <div className="border bg-accent rounded p-6 w-full">
          <h1 className=" p-3 text-2xl font-bold tracking-tight ">
              Order Status
          </h1>

          <div className="p-5 flex items-center justify-between gap-x-10">
              <div className="flex  flex-col items-center justify-center">
                <TicketCheck />
                <span>Order Placed</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <PackageCheck />
                <span>Order Confirmed</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Pizza />
                <span>Order Preparation</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Truck />
                <span>Out for delivery</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <SquareCheckBig />
                <span>Delivered</span>
              </div>

          </div>

          <Progress value={calculateProgress(orderStatus)} />


      </div>

    </div>
  );
};

export default OrderDetails;
