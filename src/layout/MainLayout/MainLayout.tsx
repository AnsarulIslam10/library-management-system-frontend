import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function MainLayout() {
  return (
    <div className="">
      <Navbar />
      <div className="min-h-[calc(100vh-100px)] max-w-7xl mx-auto px-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
