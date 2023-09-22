import React, { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Notifications from "../../Notifications/Notifications";
import { FaSun } from "react-icons/fa";
import { BsFillMoonFill } from "react-icons/bs";

const UserName = () => {
  const { user, theme, handleThemeToggle } = useContext(AuthContext);

  // const handleNotification =()=>{
  //   addNotification({
  //     title: 'ElectraPoll',
  //     subtitle: 'A new Blog is published',
  //     message: 'This is a very long message',
  //     theme: 'darkblue',
  //     duration: 4000,
  //     native: true ,
  //     onClick:()=> window.location = 'http://localhost:5173/blog'
  // });
  // }

  const handleNotification = () => {
    fetch
      .post(`${import.meta.env.VITE_URL}/notifications`)
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <div className="bg-gray-100 dark:bg-[#282828] dark:text-white mb-4 py-3 px-4 border-b-2 flex justify-between gap-5">
      <div className="sm:flex flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-teal-600 ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">{user?.displayName}</h3>
          <p className="font-semibold"> Welcome to the dashboard</p>
        </div>
      </div>

      <div className="flex items-center">
        <button className="inline mr-5" onClick={handleThemeToggle}>
          {theme === "dark" ? <FaSun color="white" /> : <BsFillMoonFill />}
        </button>
        <Notifications />
      </div>
    </div>
  );
};

export default UserName;
