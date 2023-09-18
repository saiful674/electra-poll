import ChatBot from "../../../components/ChatBot/ChatBot";
import LazyComponent from "../../../components/LazyComponent";
import About from "../About/About";
import Banner from "../Banner/Banner";
import BlogHome from "../BlogHome/BlogHome";
import Company from "../Company/Company";
import ContactUs from "../ContactUs/ContactUs";
import Faq from "../Faq/Faq";
import Features from "../Features/Features";
import HowItsWorks from "../HowItsWorks/HowItsWorks";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Features></Features>
      <HowItsWorks></HowItsWorks>
      <Faq></Faq>
      <LazyComponent MyComponent={<Testimonial />}></LazyComponent>
      <Company />
      <LazyComponent MyComponent={<BlogHome />}></LazyComponent>

      <ChatBot />
      {/* <ContactUs></ContactUs> */}
    </div>
  );
};

export default Home;
