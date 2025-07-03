import Carousel from "@/components/Carousel/Carousel";
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
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/api/libraryApi";
import { Book, BookOpen, Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetBooksQuery({ page, limit: 8 });
  const navigate = useNavigate();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
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
  const { books, pagination } = data || { books: [], pagination: null };

  return (
    <div className="">
      <Carousel />
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-10 mt-16">
        Library Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books?.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 border border-gray-100 relative group text-center"
          >
            <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit-book/${book._id}`);
                }}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
                title="Edit book"
              >
                <Pen className="h-4 w-4 text-gray-700" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/borrow/${book._id}`);
                }}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
                title="Borrow book"
              >
                <BookOpen className="h-4 w-4 text-cyan-600" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(book._id);
                }}
                disabled={isDeleting}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete book"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>

            <div className="relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 text-xs font-semibold text-white bg-cyan-600/90 px-2.5 py-1 rounded-full backdrop-blur-sm">
                {book.genre}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600">by {book.author}</p>
              </div>

              <div className="mt-2 flex items-center justify-center ">
                <span
                  className={`text-sm font-medium px-2.5 py-1 rounded-full ${
                    book.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.available ? "Available" : "Checked Out"}
                </span>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`/book/${book._id}`)}
                  className="flex-1 py-2 px-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                >
                  View Details
                </button>

                {book.available && (
                  <button
                    onClick={() => navigate(`/borrow/${book._id}`)}
                    className="p-2 text-cyan-600 border border-cyan-100 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors cursor-pointer"
                    title="Borrow book"
                  >
                    <BookOpen className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center space-x-4">
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

              {/* current page info */}
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
