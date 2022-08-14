import axios from "axios";
import Cookies from "universal-cookie";

const API = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_END_POINT}`,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
});
        
API.interceptors.request.use(function(req){
    const cookies = new Cookies();
    if (cookies.get('auth_token')){
        const cookie = cookies.get("auth_token");
        req.headers.authorization = `bearer ${cookie}`;
    }
    return req;
});
export default API;