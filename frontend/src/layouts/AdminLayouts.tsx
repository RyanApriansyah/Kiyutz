import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function AdminLayouts() {
  return (
    <div className="min-h-screen bg-[#F8F9FE]">
      <Sidebar />

      <main className="pt-16 lg:ml-[72px] lg:pt-0">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}