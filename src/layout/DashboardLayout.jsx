import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import getMyInfo from "../Hooks/getMyInfo";
import Overview from "../pages/Dashboard/SubPages/Overview/Overview";
import AdminHome from "../pages/Dashboard/adminPages/AdminHome/AdminHome";
import PushButton from "../components/PushButton/PushButton";

const DashboardLayout = () => {
  const { myInfo } = getMyInfo();
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden md:ml-64 bg-gray-100">
        <div className="p-5">
          <Outlet />
          <PushButton></PushButton>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
