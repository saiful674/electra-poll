import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import ChatBot from "../components/ChatBot/ChatBot";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";

const Main = () => {
    useEffect(() => {
        Aos.init({
            duration: 800,
            once: true
        })
    }, [])

    return (
        <div className="overflow-x-hidden">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollRestoration></ScrollRestoration>
            
            <ChatBot/>
        </div>
    );
};

export default Main;