import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import React from "react";
import { useNavigate } from "react-router-dom";

const OrderTable = ({ orders }) => {
    const navigate = useNavigate();
  return (
    <>
    {
        (orders?.length>0) ? (
            <Table className="">
                <TableCaption>A list of your recent orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Order Id</TableHead>
                    <TableHead>Placed At</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => {
                    return (
                        <TableRow className="cursor-pointer" onClick={()=>{navigate(`/order/${order?._id}`)}}>
                            <TableCell className="font-medium">{order?._id}</TableCell>
                            <TableCell>{moment.utc(`${order?.createdAt}`).format('DD MMMM, HH:mm')}</TableCell>
                            <TableCell>{order?.address}</TableCell>
                            <TableCell className="text-right">${order?.totalCost}</TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
        ) : (
            <div>
                order not found
            </div>
        )
    }
    </>
  );
  
};

export default OrderTable;
