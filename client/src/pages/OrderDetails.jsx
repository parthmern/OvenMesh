import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { order, url } from "../services/paths";
import {io} from "socket.io-client"

import { TicketCheck } from 'lucide-react';
import { PackageCheck } from 'lucide-react';
import { Pizza, Terminal } from 'lucide-react';
import { Truck } from 'lucide-react';
import { SquareCheckBig } from 'lucide-react';
import { Progress } from "../components/ui/progress";
import moment from "moment";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"


const OrderDetails = () => {

    const [orderStatus, setOrderStatus] = useState();
    const [orderTime, setOrderTime] = useState();

  //==========================
  const [socketId, setSocketId] = useState();

  const socket = useMemo(() => {
    return io(url);
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
      setOrderStatus(data?.status);
      setOrderTime(data?.time);
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
        setOrderTime(res?.data?.orderDetail?.time)
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


  function findTimestampByStatus(status) {
    console.log("rendered again");
    // Iterate through the orderTime array in reverse order
    for (let i = orderTime.length - 1; i >= 0; i--) {
        const entry = orderTime[i];
        if (entry.status === status) {
            return entry.updatedAt;
        }
    }
    return null; // If not found
}



  return (
    <div className="p-5 pt-16 flex flex-col w-full">
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
                <span className="text-sm text-[#515865]">{orderTime && (findTimestampByStatus("placed") && moment(findTimestampByStatus("placed")).format("hh:mm A")) }</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <PackageCheck />
                <span>Order Confirmed</span>
                <span className="text-sm text-[#515865]">{orderTime && (findTimestampByStatus("confirmation") && moment(findTimestampByStatus("confirmation")).format("hh:mm A")) }</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Pizza />
                <span>Order Preparation</span>
                <span className="text-sm text-[#515865]">{orderTime && (findTimestampByStatus("preparation") && moment(findTimestampByStatus("preparation")).format("hh:mm A")) }</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Truck />
                <span>Out for delivery</span>
                <span className="text-sm text-[#515865]">{orderTime && (findTimestampByStatus("outForDelivery") && moment(findTimestampByStatus("outForDelivery")).format("hh:mm A")) }</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <SquareCheckBig />
                <span>Delivered</span>
                <span className="text-sm text-[#515865]">{orderTime && (findTimestampByStatus("delivered") && moment(findTimestampByStatus("delivered")).format("hh:mm A")) }</span>
              
              </div>

          </div>

          <Progress value={calculateProgress(orderStatus)} />


      </div>

      <div className="border p-3 rounded-lg mt-8">
        
        {
          detail && (

            <div>

              <div className="flex gap-x-3">
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Address</AlertTitle>
                    <AlertDescription>
                      {detail?.address}
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Phone Number</AlertTitle>
                    <AlertDescription>
                      {detail?.phoneNum ? detail?.phoneNum : "Not available" }
                    </AlertDescription>
                  </Alert>

              </div>

              <div className="border rounded-lg mt-3 p-3">
                <div>

                {
                  detail?.pizzas.map((pizza)=>{
                    return(
                      <div className="flex items-center border-b pb-3 justify-between mt-2">
                        <div className="flex items-center gap-x-3">
                            <div className="w-[50px]">
                                <img src={pizza?.img} />
                            </div>
                            <div className="font-semibold">
                                {pizza?.name}
                            </div>
                        </div>
                        <div>
                          $ {pizza?.price}
                        </div>
                      </div>
                    )
                  })
                }

                </div>

                <div className="flex mt-3 items-center justify-end ">

                      <div className="font-semibold mr-3">
                        Total Cost :
                      </div>

                      <div>
                        $ {detail?.totalCost}
                      </div>

                    </div>
                
              </div>

              <div>

              </div>
            

            </div>

            
          )
        }
      </div>

    </div> 
  );
};

export default OrderDetails;
