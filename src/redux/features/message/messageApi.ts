/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

type TError = {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};

type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
};

type TResponse<T> = {
    data?: T;
    error?: TError;
    meta?: TMeta;
    success: boolean;
    message: string;
};

type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

const message = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        //-----------------Get Users-----------------
        getUsers: builder.query({
            query: () => ({
                url: "/messages/users",
                method: "GET",
            }),
            providesTags: ["message"],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data
                };
            },
        }),

        //-----------------Get Messages-----------------
        getMessages: builder.query({
            query: (args) => ({
                url: `/messages/${args.userId}`,
                method: "GET",
            }),
            providesTags: ["message"],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data
                };
            },
        }),

        //-----------------Send Messages-----------------
        SendMessages: builder.mutation({
            query: (args) => ({
                url: `/messages/send/${args.userID}`,
                method: "POST",
                body: args.data,
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetMessagesQuery,
    useSendMessagesMutation
} = message;
