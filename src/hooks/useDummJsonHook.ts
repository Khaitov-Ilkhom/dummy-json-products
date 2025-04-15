import { useQuery} from "@tanstack/react-query";
import {getAllProducts, getProduct} from "@/api/dummyJson.ts";


export const useGetAllProduct = () => {
  const {data, isPending: productLoading} = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts()
  });

  const products = data?.data?.products || []

  return {products, productLoading};
};

export const useGetProducts = (id: string | undefined) => {
  const {data, isPending: productLoading} = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
    enabled: !!id
  })

  const product = data?.data || {}

  return{product, productLoading};
};