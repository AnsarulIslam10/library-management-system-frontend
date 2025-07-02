import { Button } from "@/components/ui/button";
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
import { Book, Pen, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function BookListPage() {
  const { data: books, error, isLoading } = useGetBooksQuery({});
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const navigate = useNavigate();
console.log(books)
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book")) {
      await deleteBook(id);
    }
  };

  if (isLoading) {
    return <p>Loading.........</p>;
  }
  if (error) {
    return <p>Error Loading books......</p>;
  }
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold underline mb-5">
        Books List
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
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
          {books?.map((book) => (
            <TableRow key={book._id}>
              <Link to={`/book/${book._id}`}>
                <TableCell className="font-medium">{book.title}</TableCell>
              </Link>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                {book.available ? "Available" : "Unavailable"}
              </TableCell>
              <TableCell className="flex items-center gap-2 justify-around">
                <Pen
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                  className="cursor-pointer"
                />
                <Button
                  variant={"ghost"}
                  className="cursor-pointer"
                  onClick={() => navigate(`/borrow/${book._id}`)}
                >
                  <Book />
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => handleDelete(book._id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="cursor-pointer text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
