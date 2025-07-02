import { useGetBookByIdQuery } from "@/redux/api/libraryApi";
import { useParams } from "react-router";

export default function BookDetailsPage() {
  const { id: bookId } = useParams();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId!);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }
  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 border rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{book?.title}</h1>
      <div className="space-y-2 text-lg">
        <p>
          <strong>Author:</strong> {book?.author}
        </p>
        <p>
          <strong>Genre:</strong> {book?.genre}
        </p>
        <p>
          <strong>ISBN:</strong> {book?.isbn}
        </p>
        <p>
          <strong>Description:</strong> {book?.description}
        </p>
        <p>
          <strong>Copies:</strong> {book?.copies}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={book?.available ? "text-green-600" : "text-red-600"}>
            {book?.available ? "Available" : "Unavailable"}
          </span>
        </p>
      </div>
    </div>
  );
}
