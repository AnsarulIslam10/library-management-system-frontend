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
import { useGetBooksQuery } from "@/redux/api/libraryApi";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetBooksQuery({ page, limit: 8 });
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>Error Loading books......</p>;
  }
  const { books, pagination } = data || { books: [], pagination: null };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-8">
      <Carousel />
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
        Library Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books?.map((book) => (
          <div
            key={book._id}
            className="bg-white  overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 border border-gray-100"
          >
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

              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`text-sm font-medium px-2.5 py-1 rounded-full ${
                    book.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <Button
                onClick={() => navigate(`/book/${book._id}`)}
                className="mt-4 w-full py-2 px-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 rounded-none cursor-pointer"
              >
                View Details
              </Button>
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
