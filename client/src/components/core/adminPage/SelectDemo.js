import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { apiConnector } from "../../../services/apiConnector";
import {url} from "../../../services/paths";
import toast from "react-hot-toast";

export function SelectDemo({order, id}) {
  return (
    <Select id={id} onValueChange={async (value)=>{
        console.log("val and order id->", value, id);
        //console.log(id);

        const toastId = toast.loading(`updating order status for ${id}`);
        try{

            const res = await apiConnector("POST", url+"order/updateStatus",
                {
                    orderId : id , 
                    status : value ,
                }
            )

            console.log("res=>", res);

            toast.success(`order status updated successfully for ${id}`);

        }
        catch(error){
            console.log("error->", error);

            toast.error("Order status not updated");

        }
        toast.dismiss(toastId);
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={order?.status} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem  value="placed">Placed</SelectItem>
          <SelectItem value="confirmation">confirmation</SelectItem>
          <SelectItem value="preparation">preparation</SelectItem>
          <SelectItem value="outForDelivery">outForDelivery</SelectItem>
          <SelectItem value="delivered">delivered</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
