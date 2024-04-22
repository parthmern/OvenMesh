import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { order, url } from "../services/paths";
import {io} from "socket.io-client"

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

  return (
    <div><p>{detail?.status}</p>
    <p>{orderStatus}</p>
    </div>
  );
};

export default OrderDetails;
