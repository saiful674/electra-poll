import About from "../About/About";
import Banner from "../Banner/Banner";
import Company from "../Company/Company";
import Faq from "../Faq/Faq";
import Features from "../Features/Features";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Features></Features>
      <Company/>
      <Faq></Faq>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
