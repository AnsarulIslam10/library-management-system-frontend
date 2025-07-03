import { Link, NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 shadow-2xl">
      <div>
        <Link to={"/"} className="text-3xl font-bold text-cyan-500">LMS</Link>
      </div>
      <div className="flex gap-4">
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "hover:underline"
          }
        >
          All Books
        </NavLink>
        <NavLink
          to="/create-book"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "hover:underline"
          }
        >
          Add Book
        </NavLink>
        <NavLink
          to="/borrow-summary"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "hover:underline"
          }
        >
          Borrow Summary
        </NavLink>
      </div>
    </nav>
  );
}
