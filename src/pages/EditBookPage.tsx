import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/libraryApi";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface EditBookFormValues {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: string;
  description: string;
  image?: string;
}

export default function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const { data: bookData, isLoading, error } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const navigate = useNavigate();

  const form = useForm<EditBookFormValues>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 0,
      available: "true",
      description: "",
      image: "",
    },
  });

  useEffect(() => {
    if (bookData) {
      form.reset({
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        isbn: bookData.isbn,
        copies: bookData.copies,
        available: bookData.available.toString(),
        description: bookData.description,
        image: bookData.image || "",
      });
    }
  }, [bookData, form]);

  const onSubmit: SubmitHandler<EditBookFormValues> = async (data) => {
    try {
      await updateBook({
        id: id!,
        data: {
          ...data,
          available: data.available === "true",
          copies: Number(data.copies),
        },
      }).unwrap();

      toast("Book updated successfully");
      navigate("/books");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) return <p>Loading book data...</p>;
  if (error || !bookData) return <p>Error loading book.</p>;

  return (
    <div className="max-w-3xl mx-auto shadow-xl p-4 rounded-xl mt-16">
      <h2 className="text-3xl font-semibold text-center mb-4 underline">
        Edit Book
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter book title" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter author name" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">FICTION</SelectItem>
                      <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                      <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                      <SelectItem value="HISTORY">HISTORY</SelectItem>
                      <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                      <SelectItem value="FANTASY">FANTASY</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter ISBN number" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      placeholder="Number of copies"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    {...field}
                    placeholder="Enter book image url"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Write description" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
