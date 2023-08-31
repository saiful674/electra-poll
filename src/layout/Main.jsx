import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";
import { TypeAnimation } from 'react-type-animation';

const Main = () => {

    useEffect(() => {
        Aos.init({
            duration: 800,
            once: true
        })
    }, [])


    return (
        <div className={`overflow-x-hidden`}>
            <Navbar></Navbar>
            <div className=' min-h-[calc(100vh-484px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default Main;