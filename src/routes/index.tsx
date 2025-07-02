import MainLayout from "@/layout/MainLayout/MainLayout";
import AddNewBookPage from "@/pages/AddNewBookPage";
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
        path: "/edit-book/:id",
        element: "",
      },
      {
        path: "/create-book",
        element: <AddNewBookPage />,
      },
    ],
  },
]);

export default router;
