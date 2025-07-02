import MainLayout from "@/layout/MainLayout/MainLayout";
import AddNewBookPage from "@/pages/AddNewBookPage";
import BookListPage from "@/pages/BookListPage";
import BorrowBookPage from "@/pages/BorrowBookPage";

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
        path: "/books",
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
      {
        path: "/borrow/:bookId",
        element: <BorrowBookPage />,
      },
    ],
  },
]);

export default router;
