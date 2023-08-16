import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
import { Provider } from "react-redux";
import store from "../ReduxSlices/electropoll";

const Main = () => {
    useEffect(() => {
        Aos.init({
            duration: 800,
            once: true
        })
    }, [])

    return (
        <div className="overflow-x-hidden">
            <Provider store={store}>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
                <ScrollRestoration></ScrollRestoration>
            </Provider>
        </div>
    );
};

export default Main;