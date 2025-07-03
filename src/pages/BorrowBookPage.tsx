import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from "@/redux/api/libraryApi";
import { format } from "date-fns";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
type BorrowFormInputs = {
  quantity: number;
  dueDate: string;
};
export default function BorrowBookPage() {
  const { bookId } = useParams();
  console.log(bookId)
  const navigate = useNavigate();
  const form = useForm<BorrowFormInputs>();

  const { data: bookData, isLoading: bookLoading } = useGetBookByIdQuery(
    bookId!
  );
  console.log(bookData)
  const maxQuantity = bookData?.copies ?? 0;
  const [borrowBook, { isLoading: borrowLoading }] = useBorrowBookMutation();

  const onSubmit: SubmitHandler<BorrowFormInputs> = async (data) => {
    const payload = {
      book: bookId!,
      quantity: Number(data.quantity),
      dueDate: data.dueDate,
    };

    try {
      await borrowBook(payload).unwrap();
      toast("Book borrowed successfully");
      navigate("/borrow-summary");
    } catch (error) {
      toast("Failed to borrow book");
      console.log(error)
    }
  };
  const onError = (errors: Record<string, any>) => {
    const firstError = Object.values(errors)[0];
    if (
      firstError &&
      typeof firstError === "object" &&
      "message" in firstError
    ) {
      toast.error(firstError.message);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border shadow rounded">
      <h2 className="text-xl font-bold mb-4">Borrow Book</h2>

      {bookLoading ? (
        <Loader />
      ) : !bookData ? (
        <p className="text-red-500">Book not found</p>
      ) : (
        <>
          <div className="mb-6">
            <p>
              <strong>Title:</strong> {bookData?.title}
            </p>
            <p>
              <strong>Available Copies:</strong> {bookData.copies}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
              <FormField
                control={form.control}
                name="quantity"
                rules={{
                  required: "Quantity is required",
                  min: { value: 1, message: "Must be at least 1" },
                  max: {
                    value: maxQuantity,
                    message: `Cannot exceed available copies (${maxQuantity})`,
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter quantity"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                rules={{ required: "Due date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        min={format(new Date(), "yyyy-MM-dd")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={borrowLoading}>
                {borrowLoading ? "Borrowing..." : "Borrow Book"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
