import Loader from "@/components/Loader/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/api/libraryApi";

export default function BorrowSummaryPage() {
  const { data: summary, isLoading, isError } = useGetBorrowSummaryQuery();
  console.log(summary)
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <p>Faild to load summary</p>;
  }
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-semibold mb-4 text-center underline">
        Borrowed Books Summary
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Borrowed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.book.title}</TableCell>
              <TableCell>{item.book.isbn}</TableCell>
              <TableCell>{item.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
