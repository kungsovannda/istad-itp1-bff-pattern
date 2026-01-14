import { baseQuery } from "@/services/base-query";
import { Product } from "@/types/productType";
import { createApi } from "@reduxjs/toolkit/query/react";


type CreateProductType = {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      providesTags: ["Product"]
    }),
    addProduct: builder.mutation<Product, CreateProductType>({
      query: (body) => ({
        url: "products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
