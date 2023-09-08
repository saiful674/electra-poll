import React, { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import Notifications from "../../../../components/Notifications/Notifications";

const AdminUserName = () => {
  const { user } = useContext(AuthContext);
  console.log("user ifi", user);
  return (
    <div className="bg-gray-100 mb-4 py-3 px-4 border-b-2 flex justify-between gap-4 items-center">
      <div className=" sm:flex flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-teal-600 ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold">{user?.displayName}</h3>
          <p className="font-semibold"> Welcome to the admin dashboard</p>
        </div>
      </div>
      <Notifications />
    </div>
  );
};

export default AdminUserName;
