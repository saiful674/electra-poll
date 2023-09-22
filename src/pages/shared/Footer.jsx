import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="bg-green-50 dark:bg-[#1B1B1B] dark:text-gray-300 lg:min-h-[50vh] rounded-t-3xl dark:rounded-none">
      <div className="my-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 justify-items-center gap-10 xl:gap-0 py-10 xl:py-32">
        <div className="xl:col-span-2">
          <img className="h-12 mx-auto" src="logo.png" alt="" />
          <p className="text-center mx-auto mt-5">
            Electro Poll is revolutionizing the voting experience, ensuring
            every vote is cast securely and seamlessly. Embrace the future of
            voting with confidence, clarity, and convenience
          </p>
        </div>

        <div className="">
          <h1 className="font-semibold text-center text-2xl mb-5">Links</h1>
          <ul className="flex flex-col items-center gap-5 underline">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </ul>
        </div>

        <div className="">
          <h1 className="font-semibold text-center text-2xl mb-5">Company</h1>
          <ul className="flex flex-col items-center justify-center gap-5 underline">
            <Link to="/">About Us</Link>
            <Link to="/support">Support</Link>
            <Link to="/services">Services</Link>
          </ul>
        </div>

        <div className="">
          <h1 className="font-semibold text-2xl text-center mb-5">Socials</h1>
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
    </section>
  );
};

export default Footer;
