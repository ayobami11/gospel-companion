import axios from "axios";

export const instance = axios.create({
    baseURL: "https://gospel-companion.azurewebsites.net"
});