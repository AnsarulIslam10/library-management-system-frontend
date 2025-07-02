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
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Books', 'Borrows'],
    endpoints: (builder) => ({
        getBooks: builder.query<Book[], { filter?: string; sortBy?: string; sort?: string; limit?: number }>({
            query: (params) => ({
                url: 'books',
                params,
            }),
            transformResponse: (response: { success: boolean; message: string; data: Book[] }) => response.data,
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
            { book: { title: string; isbn: string }; totalQuantity: number }[],
            void
        >({
            query: () => 'borrow',
            transformResponse: (response: {
                success: boolean;
                message: string;
                data: { book: { title: string; isbn: string }; totalQuantity: number }[];
            }) => response.data,
            providesTags: ['Borrows'],
        }),
    })
})

export const { useGetBooksQuery, useCreateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useGetBookByIdQuery, useGetBorrowSummaryQuery } = libraryApi;