import Loader from "@/components/Loader/Loader";
import { useGetBookByIdQuery } from "@/redux/api/libraryApi";
import { useParams } from "react-router";

export default function BookDetailsPage() {
  const { id: bookId } = useParams();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId!);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <p>Error</p>;
  }
  return (
    <div className="max-w-6xl mx-auto my-10 p-6 border rounded shadow">
      <div className="space-y-2 text-lg md:flex gap-5">
        <div className="flex justify-center">
          <img src={book?.image} alt="" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">{book?.title}</h1>
          <p>
            <strong>Author:</strong> {book?.author}
          </p>
          <p>
            <strong>Genre:</strong>{" "}
            <span className="bg-blue-400 px-2 rounded-xl text-sm text-white">
              {book?.genre}
            </span>
          </p>
          <p>
            <strong>ISBN:</strong> {book?.isbn}
          </p>
          <p>
            <strong>Copies:</strong> {book?.copies}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={book?.available ? "text-green-600" : "text-red-600"}
            >
              {book?.available ? "Available" : "Unavailable"}
            </span>
            <p>
              <strong>Description:</strong> {book?.description}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}
