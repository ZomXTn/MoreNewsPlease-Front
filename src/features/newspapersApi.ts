import { apiSlice } from "../slices/apiSlice";
import { IArticle, INewspaper } from "../types/entities";
import { IPaginated } from "../types/types";


interface IPaginatedNewspaper extends IPaginated<INewspaper> { };

const newspaperApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNewspapers: builder.query<IPaginatedNewspaper, string>({
            query: (params) => ({
                url: `/api/newspapers?${params}`,
                method: "GET",
            }),
        }),
        getNewspapersNoPagination: builder.query<INewspaper[], void>({
            query: () => ({
                url: `/api/newspapers/`,
                method: "GET",
            }),
        }),
        getNewspaper: builder.query<INewspaper, string>({
            query: (id) => ({
                url: `/api/newspapers/${id}/`,
                method: "GET",
            }),
        }),
        createNewspaper: builder.mutation<INewspaper, Partial<INewspaper>>({
            query: (newspaper) => ({
                url: `/api/newspapers/`,
                method: "POST",
                body: newspaper,
            }),
        }),
        updateNewspaper: builder.mutation<INewspaper, Partial<INewspaper>>({
            query: ({ newspaper_id, ...newspaper }) => ({
                url: `/api/newspapers/${newspaper_id}/`,
                method: "put",
                body: newspaper,
            }),
        }),
        deleteNewspaper: builder.mutation<void, string>({
            query: (id) => ({
                url: `/api/newspapers/${id}/`,
                method: "DELETE",
            }),
        }),
        createArticle: builder.mutation<IArticle, IArticle>({
            query: (article) => ({
                url: `/api/newspapers/${article.newspaper.newspaper_id}/create-article/`,
                method: "POST",
                body: article,
            }),
        }),

    }),
})

const enhancedApi = newspaperApi.enhanceEndpoints({
    addTagTypes: ["modification_newspapers"],
    endpoints: {
        getNewspapers: {
            providesTags: ["modification_newspapers"],
        },
        getNewspapersNoPagination: {
            providesTags: ["modification_newspapers"],
        },
        getNewspaper: {
            providesTags: ["modification_newspapers"],
        },
        createNewspaper: {
            invalidatesTags: ["modification_newspapers"],
        },
        updateNewspaper: {
            invalidatesTags: ["modification_newspapers"],
        },
        deleteNewspaper: {
            invalidatesTags: ["modification_newspapers"],
        },
        createArticle: {
            invalidatesTags: ["modification_newspapers"],
        },
    },
});

export const { useGetNewspapersQuery, useCreateNewspaperMutation, useDeleteNewspaperMutation,  useCreateArticleMutation, useUpdateNewspaperMutation, useGetNewspaperQuery, useGetNewspapersNoPaginationQuery } = newspaperApi;