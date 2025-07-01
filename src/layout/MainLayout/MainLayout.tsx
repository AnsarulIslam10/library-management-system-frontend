import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="max-w-7xl mx-auto px-2">
      <Navbar />
      <Outlet />
    </div>
  );
}
