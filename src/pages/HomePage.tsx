import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/libraryApi";
import { useNavigate } from "react-router";

export default function HomePage() {
  const { data: books, error, isLoading } = useGetBooksQuery({});
  const navigate = useNavigate();
  console.log(books);

  if (isLoading) {
    return <p>Loading.........</p>;
  }
  if (error) {
    return <p>Error Loading books......</p>;
  }
  return (
    <div className="px-4 md:px-10 lg:px-20 py-8">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
        📚 Library Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books?.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-56">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
                <p className="text-xs text-white inline-block bg-blue-600 px-2 py-0.5 rounded">
                  {book.genre}
                </p>
              </div>
              <div className="mt-4">
                <p
                  className={`text-sm mb-2 ${
                    book.available ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {book.available ? "Available" : "Not Available"}
                </p>
                <Button
                  onClick={() => navigate(`/book/${book._id}`)}
                  className="w-full py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition cursor-pointer"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
