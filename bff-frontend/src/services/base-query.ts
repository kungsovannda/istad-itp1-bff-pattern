"use client";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = () =>
  fetchBaseQuery({
    baseUrl: `/api/v1/`,
    prepareHeaders: async (headers) => {
      // if (session?.access_token) {
      //   headers.set("Authorization", `Bearer ${session.access_token}`);
      // }
      return headers;
    },
  });
