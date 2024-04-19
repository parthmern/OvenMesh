import axios from "axios";

export const axiosInstance = axios.create() ;

export const apiConnector = (method, url, bodyData, header, params) =>{
    //console.log("method in apiconnector=>", method);
    return axiosInstance({
        method : `${method}` ,
        url : `${url}` ,
        data : bodyData ? bodyData : null ,
        headers : header ? header : null ,
        params : params ? params : null ,
    })
}
