import axios from "axios";

const API = axios.create({
  baseURL: "guitarshopbackend-production.up.railway.app",
  withCredentials: true
}
);

export default API;
