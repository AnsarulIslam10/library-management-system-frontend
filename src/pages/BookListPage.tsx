import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/api/libraryApi";
import { BookOpen, Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
export default function BookListPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, error, isLoading } = useGetBooksQuery({ page, limit });
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const navigate = useNavigate();
  const books = data?.books || [];
  const pagination = data?.pagination || null;

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteBook(id);
      Swal.fire({
        title: "Deleted!",
        text: "The book has been deleted.",
        icon: "success",
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>Error Loading books......</p>;
  }
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold text-center mb-4 text-cyan-500">
        Books List
      </h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-cyan-300 hover:bg-cyan-400">
            <TableHead>No.</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books?.map((book, idx) => (
            <TableRow key={book._id}>
              <TableCell>{idx + 1}</TableCell>

              <TableCell className="font-medium">
                <Link to={`/book/${book._id}`}>{book.title}</Link>
              </TableCell>

              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                {book.available ? "Available" : "Unavailable"}
              </TableCell>
              <TableCell className="flex items-center gap-2 justify-around">
                <Button
                  variant={"ghost"}
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                  className="cursor-pointer"
                  title="Edit Book"
                >
                  <Pen />
                </Button>
                <Button
                  variant={"ghost"}
                  className="cursor-pointer"
                  onClick={() => navigate(`/borrow/${book._id}`)}
                  disabled={!book.available}
                  title="Borrow Book"
                >
                  <BookOpen />
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => handleDelete(book._id)}
                  disabled={isDeleting}
                  title="Delete"
                >
                  <Trash2 className="cursor-pointer text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < pagination.totalPages) setPage(page + 1);
                  }}
                  className={
                    page === pagination.totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
