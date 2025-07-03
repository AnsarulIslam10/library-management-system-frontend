import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img className="w-16" src="/public/book logo.png" alt="" />
          <span className="text-4xl font-bold text-cyan-500 transition-all duration-300">
            LMS
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            to="/books"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-cyan-100 text-cyan-800 shadow-inner"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/create-book"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-cyan-100 text-cyan-800 shadow-inner"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-cyan-100 text-cyan-800 shadow-inner"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            Borrow Summary
          </NavLink>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          mobileOpen
            ? "max-h-96 opacity-100 pt-4"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-2">
          <NavLink
            to="/books"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 text-sm font-medium ${
                isActive
                  ? "bg-cyan-100 text-cyan-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/create-book"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 text-sm font-medium ${
                isActive
                  ? "bg-cyan-100 text-cyan-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 text-sm font-medium ${
                isActive
                  ? "bg-cyan-100 text-cyan-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Borrow Summary
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
