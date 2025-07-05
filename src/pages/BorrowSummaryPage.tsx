import Loader from "@/components/Loader/Loader";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/api/libraryApi";
import { useState } from "react";

export default function BorrowSummaryPage() {
  const [page, setPage] = useState(1)
  const limit = 10;

  const { data, isLoading, isError } = useGetBorrowSummaryQuery({ page, limit});
  
  const borrows = data?.borrows || [];
  const pagination = data?.pagination;

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <p>Faild to load summary</p>;
  }
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-center mb-4 text-cyan-500">
        Borrowed Books Summary
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="bg-cyan-300 hover:bg-cyan-400">
            <TableHead>No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Borrowed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrows?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{item.book.title}</TableCell>
              <TableCell>{item.book.isbn}</TableCell>
              <TableCell>{item.totalQuantity}</TableCell>
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
