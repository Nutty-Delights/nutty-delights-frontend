import axios from "axios";

export default axios.create({
    // baseURL: "http://192.168.29.230:8081",
    baseURL: "http://localhost:8081",
    headers: {
        "Content-type": "application/json"
    }
});