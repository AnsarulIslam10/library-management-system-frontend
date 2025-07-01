import MainLayout from "@/layout/MainLayout/MainLayout";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                path: "/",
                element: <div>He</div>,
            },
            {
                path: '/',
                element: "div",
            },
        ]
    }
])

export default router;