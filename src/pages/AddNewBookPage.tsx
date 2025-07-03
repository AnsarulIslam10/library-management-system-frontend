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
import { useCreateBookMutation } from "@/redux/api/libraryApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
type BookFormInputs = {
  title: string;
  author: string;
  image: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: "true" | "false";
};
export default function AddNewBookPage() {
  const form = useForm<BookFormInputs>();
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<BookFormInputs> = async (data) => {
    const payload = {
      ...data,
      copies: Number(data.copies),
      available: data.available === "true",
    };
    try {
      await createBook(payload).unwrap();
      form.reset();
      toast.success("Book added successfully");
      navigate("/books");
    } catch (error) {
      toast.error("Faild to add book");
    }
    form.reset();
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
    <div className="max-w-3xl mx-auto shadow-xl p-4 rounded-xl mt-16">
      <h2 className="text-3xl font-bold text-center mb-4 text-cyan-500">
        Add New Book
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-3"
        >
          <div className="">
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <FormField
                control={form.control}
                name="title"
                rules={{
                  required: "Enter Book Title",
                }}
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
                rules={{
                  required: "Enter Auther Name",
                }}
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
                rules={{
                  required: "Must Select a Genre",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
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
                rules={{
                  required: "Enter ISBN",
                }}
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
                rules={{
                  required: "Copies is required",
                  min: { value: 1, message: "Copies must be at least 1" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Number of copies"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="available"
                rules={{
                  required: "Select Availability",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
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
              rules={{
                required: "Enter Book Image URL",
              }}
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
              rules={{
                required: "Write Book's Description",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-4">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Write description" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full bg-cyan-500" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
