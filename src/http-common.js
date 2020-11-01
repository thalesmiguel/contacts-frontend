import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/rest",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "1800",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  }
});
