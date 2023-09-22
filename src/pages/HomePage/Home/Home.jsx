import ChatBot from "../../../components/ChatBot/ChatBot";
import LazyComponent from "../../../components/LazyComponent";
import About from "../About/About";
import Banner from "../Banner/Banner";
import BlogHome from "../BlogHome/BlogHome";
import Company from "../Company/Company";
import Faq from "../Faq/Faq";
import Features from "../Features/Features";
import HowItsWorks from "../HowItsWorks/HowItsWorks";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <div className="dark:bg-[#343434]">
      <Banner />
      <About />
      <Features />
      <HowItsWorks />
      <Faq />
      <LazyComponent MyComponent={<Testimonial />} />
      <Company />
      <LazyComponent MyComponent={<BlogHome />} />
      <ChatBot />
    </div>
  );
};

export default Home;
