import { useQuery} from "@tanstack/react-query";
import {getAllCategories, getAllProducts, getByCategories, getProduct} from "@/api/dummyJson.ts";


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

export const useGetAllCategories = () => {
  const {data, isPending: categoriesLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  })

  const categories = data?.data || []

  return {categories, categoriesLoading};
}

export const useGetByCategory = (category: string) => {
  console.log(category)
  const {data, isPending: categoriesLoading} = useQuery({
    queryKey: ["by-categories", category],
    queryFn: () => getByCategories(category),
    enabled: !!category
  })

  const products = data?.data?.products || []

  return {products, categoriesLoading};
}