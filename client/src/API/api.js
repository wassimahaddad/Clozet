import axios from "axios";

let url;

const localhost = "localhost";

if (process.env.NODE_ENV === "development") {
  url = `http://${localhost}:5000/api`;
}
if (process.env.NODE_ENV === "production") {
  url = "api";
}

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default api;
