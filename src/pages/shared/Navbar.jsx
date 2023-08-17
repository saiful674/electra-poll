import Aos from "aos";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogOut = () => {
    logout()
      .then(toast.success("logout successfully"))
      .catch((err) => console.log(err));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [zeroScroll, setZeroScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    if (window.scrollY <= 0) {
      setZeroScroll(true);
    } else {
      setZeroScroll(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      data-aos="fade-down"
      className={`${visible ? "" : "hidden"} ${!zeroScroll ? "bg-white shadow-lg" : "bg-green-50"
        } fixed w-screen z-30 top-0`}
    >
      <div className="hidden lg:flex my-container justify-between py-3">
        <img className="h-12" src="/logo.png" alt="" />
        <div className="flex justify-between items-center gap-5 text-lg font-semibold">
          <NavLink
            className={({ isActive }) => (isActive ? "text-green-400" : "")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-green-400" : "")}
            to="/about "
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-green-400" : "")}
            to="/election"
          >
            Election
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-green-400" : "")}
            to="/dashboard/overview"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-green-400" : "")}
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
        <div className="flex justify-between items-center gap-5 text-lg">
          <NavLink
            className={({ isActive }) => (isActive ? "text-green-400" : "")}
            to="/login"
          >
            Login
          </NavLink>
          <Link to="/registration" className="my-btn-sec">
            Register
          </Link>
        </div>
      </div>


      {/* ================ mobile view================ */}
      <div
        data-aos="fade-down"
        className={`${visible ? "" : "hidden"} ${!zeroScroll ? "bg-white shadow-lg" : "bg-green-50"
          } fixed w-screen z-10 top-0`}
      >
        <div className="lg:hidden flex justify-between my-container py-1 relative">
          <img className="h-11" src="/logo.png" alt="" />
          <button onClick={() => setIsOpen(true)}>
            <HiBars3BottomRight className="text-2xl"></HiBars3BottomRight>
          </button>
          {isOpen && (
            <ul className="absolute py-3 gap-2 rounded-md bg-white flex flex-col right-0 top-2 w-1/2 items-center">
              <button
                className="absolute right-2"
                onClick={() => setIsOpen(false)}
              >
                <HiXMark className="text-xl"></HiXMark>
              </button>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "text-green-400" : "")}
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "text-green-400" : "")}
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "text-green-400" : "")}
                to="/blog"
              >
                Blog
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "text-green-400" : "")}
                to="/contact"
              >
                Contact
              </NavLink>
            </ul>
          )}
        </div>
      </div>

    </div>
  );
};

export default Navbar;
