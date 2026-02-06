import axios from "axios";
import { configpath } from "./util/config";
const BASE_URL = configpath;
const token = localStorage.getItem('token');

export function postCartProducts(cart){
    return axios.post(`${BASE_URL}/orders/addtocart`, {products:cart},
        {headers:{'Content-type':'application/json',
        'x-access-token':`${token}`}})
    .then(res=>res.data)
}