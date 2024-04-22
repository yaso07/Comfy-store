import { useEffect } from 'react';
import { Filters, PaginationContainer, ProductsContainer } from '../components';
import { customFetch } from '../utils';
import axios from 'axios';  

const url = '/products';

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;
     
  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    
     const data = async () => {
       const res = await axios.get("http://localhost:3200/api/products");
       console.log(res);
     };
     data();
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
   
    const products = response.data.data;
     console.log(products);
    const meta = response.data.meta;
    console.log(meta)
    return { products, meta, params };
  };

const Products = () => {

      useEffect(()=>{
         console.log("asdsa")
           

            
      })
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
