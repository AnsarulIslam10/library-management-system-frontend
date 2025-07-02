import { Link, NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div>
        <Link to={'/'}>LMS</Link>
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
