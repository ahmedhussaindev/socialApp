import { Outlet } from "react-router-dom";
import Authintro from "../../component/AuthComponent/Authintro/Authintro";

export default function AuthLayout() {
  return (
    <main className="bg-second min-h-screen py-10">
      <div className="container mx-auto w-[80%]">
        <div className="grid md:grid-cols-2 gap-x-10">
          <div><Authintro /></div>
          <div><Outlet /></div>
        </div>
      </div>
    </main>
  )
}
