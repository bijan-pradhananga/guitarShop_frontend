import axios from "axios";

const API = axios.create({
  baseURL: "https://guitarshopbackend-production.up.railway.app",
  withCredentials: true
}
);

export default API;
