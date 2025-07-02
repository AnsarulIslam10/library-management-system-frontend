import { useGetBooksQuery } from "@/redux/api/libraryApi";

export default function BookListPage() {
  const { data: books, error, isLoading } = useGetBooksQuery({});

  if (isLoading) {
    return <p>Loading.........</p>;
  }
  if (error) {
    return <p>Error Loading books......</p>;
  }
  return (
    <div>
      {books?.map((book) => (
        <p key={book._id}>{book.title}</p>
      ))}
    </div>
  );
}
