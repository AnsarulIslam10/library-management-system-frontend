import MainLayout from "@/layout/MainLayout/MainLayout";
import BookListPage from "@/pages/BookListPage";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                path: "/",
                element: <BookListPage />,
            },
            {
                path: '/',
                element: "div",
            },
        ]
    }
])

export default router;