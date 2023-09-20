import { Outlet } from "react-router-dom";
import AdminDashboardSidebar from "../pages/AdminDashboard/SideBar/AdminDashboardSidebar";
import PushButton from "../components/PushButton/PushButton";

const AdminDashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <AdminDashboardSidebar />
      <div className="flex-1  md:ml-64 bg-gray-100">
        <div className="p-5">
          <Outlet />
          <PushButton></PushButton>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
