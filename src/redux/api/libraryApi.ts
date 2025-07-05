import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Book {
    _id: string;
    title: string;
    author: string;
    image: string,
    genre: string;
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
}
export interface Borrow {
    _id: string;
    book: string;
    quantity: number;
    dueDate: string;
}
export interface BorrowSummary {
    book: {
        title: string;
        isbn: string;
    };
    totalQuantity: number;
}

export const libraryApi = createApi({
    reducerPath: 'libraryApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL || '/api' }),
    tagTypes: ['Books', 'Borrows'],
    endpoints: (builder) => ({
        getBooks: builder.query<{
            books: Book[];
            pagination: {
                total: number;
                totalPages: number;
                currentPage: number;
                limit: number;
            };
        }, {
            filter?: string;
            sortBy?: string;
            sort?: string;
            limit?: number;
            page?: number;
        }>({
            query: (params) => ({
                url: 'books',
                params,
            }),
            transformResponse: (response: {
                success: boolean;
                message: string;
                data: {
                    books: Book[];
                    pagination: {
                        total: number;
                        totalPages: number;
                        currentPage: number;
                        limit: number;
                    };
                }
            }) => response.data,
            providesTags: ['Books']
        }),
        getBookById: builder.query<Book, string>({
            query: (bookId) => `books/${bookId}`,
            transformResponse: (response: { success: boolean; message: string; data: Book }) => response.data,
            providesTags: ['Books'],
        }),
        createBook: builder.mutation<Book, Partial<Book>>({
            query: (body) => ({
                url: 'books',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Books'],
        }),
        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Books"],
        }),
        deleteBook: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books']
        }),
        borrowBook: builder.mutation<Borrow, { book: string; quantity: number; dueDate: string }>({
            query: (body) => ({
                url: 'borrow',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Borrows', 'Books']
        }),
        getBorrowSummary: builder.query<
            {
                borrows: { book: { title: string; isbn: string }; totalQuantity: number }[];
                pagination: {
                    total: number;
                    totalPages: number;
                    currentPage: number;
                    limit: number;
                };
            },
            { page?: number; limit?: number }
        >({
            query: ({ page = 1, limit = 10 }) => `borrow?page=${page}&limit=${limit}`,
            transformResponse: (response: {
                success: boolean;
                message: string;
                data: {
                    borrows: { book: { title: string; isbn: string }; totalQuantity: number }[];
                    pagination: {
                        total: number;
                        totalPages: number;
                        currentPage: number;
                        limit: number;
                    };
                };
            }) => response.data,
            providesTags: ['Borrows'],
        }),

    })
})

export const { useGetBooksQuery, useCreateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useGetBookByIdQuery, useGetBorrowSummaryQuery, useUpdateBookMutation } = libraryApi;