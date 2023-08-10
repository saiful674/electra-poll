import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';

const Main = () => {
    useEffect(() => {
        Aos.init({
            duration: 800
        })
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;