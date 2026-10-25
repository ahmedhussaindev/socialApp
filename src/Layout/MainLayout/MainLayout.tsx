import { Outlet } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main className="md:pt-18 pt-16">
      <Outlet />
      </main>
    </div>
  )
}
