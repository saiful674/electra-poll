import Aos from "aos";
import {Suspense} from"react"
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";
import PushButton from "../components/PushButton/PushButton";

const Main = () => {
  const location = useLocation();

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, [location]);

  return (
<<<<<<< HEAD
   <Suspense fallback={null}>
     <div className={`overflow-x-hidden`}>
=======
    <div className={`overflow-x-hidden dark:bg-[#343434]`}>
>>>>>>> 84e0b9f28f354f890fa22ccf117845d319cd3205
      <Navbar></Navbar>
      <div className=" min-h-[calc(100vh-484px)]">
        <Outlet></Outlet>
      </div>
      <PushButton></PushButton>
      <Footer></Footer>
      <ScrollRestoration></ScrollRestoration>
    </div>
   </Suspense>
  );
};

export default Main;
