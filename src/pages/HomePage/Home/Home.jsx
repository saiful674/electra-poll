import About from "../About/About";
import Banner from "../Banner/Banner";
import Company from "../Company/Company";
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
      <Company />
      <Faq></Faq>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
