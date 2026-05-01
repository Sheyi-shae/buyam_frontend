import axios, { AxiosInstance } from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!backendUrl) throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");

const apiPublic: AxiosInstance = axios.create({
  baseURL: `${backendUrl}/api`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiPublic;