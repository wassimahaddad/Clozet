import axios from "axios";

let url;

const localhost = "10.0.0.9" || "localhost";

if (process.env.NODE_ENV === "development") {
  url = `http://${localhost}:5000/api`;
}
if (process.env.NODE_ENV === "production") {
  url = "api";
}

const api = axios.create({
  baseURL: url,
});

export default api;
