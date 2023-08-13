import Aos from "aos";
import { useEffect } from "react";

const SectionTitle = ({ title, subTitle }) => {

    useEffect(() => {
        Aos.init({
            duration: 800
        })
    }, [])

    return (
        <div data-aos="fade-up" data-aos-duration="800" className="my-container text-center md:w-2/3">
            <div className="relative inline-block">
                <h2 className="font-bold text-xl md:text-2xl mb-2 inline-block px-5 pb-1 ">{title}</h2>
                <div className="absolute w-1/2 bottom-2 translate-x-1/2 border-b-2 border-green-500"></div>
            </div>

            <p>{subTitle}</p>
        </div>
    )
};

export default SectionTitle;
