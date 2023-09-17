import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="bg-green-50 lg:min-h-[50vh] rounded-t-3xl">
            <div className="flex flex-col gap-3 my-container justify-center items-center py-8">
                <div className="space-y-2">
                    <img className="h-12 mx-auto" src="logo.png" alt="" />
                    <p className="lg:w-[50%] text-center mx-auto ">Electro Poll is revolutionizing the voting experience, ensuring every vote is cast securely and seamlessly. Embrace the future of voting with confidence, clarity, and convenience</p>
                </div>
                <div>
                    <h1 className="font-semibold text-center text-2xl">Links</h1>
                    <ul className="flex justify-center gap-5">
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/services'>Services</Link>
                        <Link to='/contact'>Contact</Link>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h1 className="font-semibold text-center text-2xl">Company</h1>
                    <ul className="flex justify-center gap-5">
                        <Link to='/'>About Us</Link>
                        <Link to='/support'>Support</Link>
                        <Link to='/services'>Services</Link>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h1 className="font-semibold text-2xl text-center">Socials</h1>
                    <div className="flex justify-center gap-3">
                        <a className="text-blue-600 text-2xl" href="">
                            <FaFacebook></FaFacebook>
                        </a>
                        <a className="text-red-600 text-2xl" href="">
                            <FaInstagram></FaInstagram>
                        </a>
                        <a className="text-blue-700 text-2xl" href="">
                            <FaLinkedin></FaLinkedin>
                        </a>
                        <a className="text-blue-400 text-2xl" href="">
                            <FaTwitter></FaTwitter>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;