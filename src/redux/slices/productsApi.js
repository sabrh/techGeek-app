import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// baseUrl points to nextjs api routes
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Products", id: _id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProduct: build.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    createProduct: build.mutation({
      query: ({ body, token }) => ({
        url: "/products",
        method: "POST",
        body,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: build.mutation({
      query: ({ id, body, token }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),
    deleteProduct: build.mutation({
      query: ({ id, token }) => ({
        url: `/products/${id}`,
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;