import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold">LMS</h1>
      <div className="flex gap-4">
        <Link to={"/all-books"}>All Books</Link>
        <Link to={"/add-books"}>Add Books</Link>
        <Link to={"borrow-summary"}>Borrow Summary</Link>
      </div>
    </div>
  );
}
