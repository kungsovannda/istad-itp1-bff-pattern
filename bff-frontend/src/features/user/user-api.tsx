import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
  email: string;
  givenName: string;
  familyName: string;
  username: string;
  roles: string[];
};

export type AuthenticationResponse = {
  isAuthenticated: boolean;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    headers: {
      credentials: "include",
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    isAuthenticated: builder.query<AuthenticationResponse, void>({
      query: () => "is-authenticated",
      providesTags: ["User"],
    }),
    user: builder.query<User, void>({
      query: () => "me",
    }),
  }),
});

export const { useIsAuthenticatedQuery, useUserQuery } = userApi;
