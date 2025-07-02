import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}

export const libraryApi = createApi({
    reducerPath: 'libraryApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        getBooks: builder.query<Book[], { filter?: string; sortBy?: string; sort?: string; limit?: number }>({
            query: (params) => ({
                url: 'books',
                params,
            }),
            transformResponse: (response: { success: boolean; message: string; data: Book[] }) => response.data,
            providesTags: ['Books']
        }),
        createBook: builder.mutation<Book, Partial<Book>>({
            query: (body) => ({
                url: 'books',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Books'],
        }),
        deleteBook: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books']
        })
    })
})

export const { useGetBooksQuery, useCreateBookMutation, useDeleteBookMutation } = libraryApi;