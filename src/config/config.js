import axios from "axios";

const API = axios.create({
  baseURL: "https://guitarshop-backend-jgye.onrender.com",
  withCredentials: true
}
);

export default API;
