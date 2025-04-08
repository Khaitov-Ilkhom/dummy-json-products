import { useQuery} from "@tanstack/react-query";
import {getAllProducts} from "@/api/dummyJson.ts";


export const useGetAllProduct = () => {
  const {data, isPending: productLoading} = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts()
  });

  const products = data?.data?.products || []

  return {products, productLoading};
};