import axiosInstance from "@/api/api.ts";


export const getAllProducts = () => axiosInstance.get(`/products?limit=0`);
