import axiosInstance from "@/api/api.ts";

export const getAllProducts = () => axiosInstance.get(`/products?limit=0`);
export const getProduct = (id: string | undefined) => axiosInstance.get(`/products/${id}`);
export const getAllCategories = () => axiosInstance.get(`/products/categories`);
export const getByCategories = (category: string) => axiosInstance.get(`/products/category/${category}`)

