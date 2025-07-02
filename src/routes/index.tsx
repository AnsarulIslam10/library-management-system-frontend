import MainLayout from "@/layout/MainLayout/MainLayout";
import AddNewBookPage from "@/pages/AddNewBookPage";
import BookDetailsPage from "@/pages/BookDetailsPage";
import BookListPage from "@/pages/BookListPage";
import BorrowBookPage from "@/pages/BorrowBookPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import EditBookPage from "@/pages/EditBookPage";
import HomePage from "@/pages/HomePage";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/books",
        element: <BookListPage />,
      },
      {
        path: "/book/:id",
        element: <BookDetailsPage/>,
      },
      {
        path: "/edit-book/:id",
        element: <EditBookPage />,
      },
      {
        path: "/create-book",
        element: <AddNewBookPage />,
      },
      {
        path: "/borrow/:bookId",
        element: <BorrowBookPage />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummaryPage />,
      },
    ],
  },
]);

export default router;
