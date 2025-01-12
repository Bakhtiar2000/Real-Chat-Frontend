/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const user = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        //-----------------Register User-----------------
        registerUser: builder.mutation({
            query: (data) => ({
                url: "/users/register",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useRegisterUserMutation } = user;
