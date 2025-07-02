import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/api/libraryApi";
import { Pen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

export default function BookListPage() {
  const { data: books, error, isLoading } = useGetBooksQuery({});
  const navigate = useNavigate()

  if (isLoading) {
    return <p>Loading.........</p>;
  }
  if (error) {
    return <p>Error Loading books......</p>;
  }
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold underline mb-5">Books List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books?.map((book) => (
            <TableRow key={book._id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>{book.available ? 'Available' : 'Unavailable'}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Pen onClick={()=> navigate(`/edit-book/${book._id}`)} className="cursor-pointer" />
                <Trash2 className="cursor-pointer text-red-500" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
