import { useEffect } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Aos from "aos";
import {useTranslation} from "react-i18next"

const About = () => {
  const {t}=useTranslation(["home","common"])

  useEffect(() => {
    Aos.init({
      duration: 800
    })
  }, [])

  return (
    <section data-aos="fade-up" data-aos-duration="800" className="my-container mb-20">
      <SectionTitle
        title={`${t("home:about-tittle")}`}
        subTitle={`${t("home:about-sub")}`}
      ></SectionTitle>
      <div className="grid lg:grid-cols-2 mt-5 gap-6 items-center">
        <div data-aos="fade-right" data-aos-duration="800" className="">
          <img className="w-[85%] md:w-[70%] lg:w-[75%] mx-auto" src="about.jpg" alt="" />
        </div>
        <div className="space-y-3 text-lg">
          <p>
            {t("home:about-p1")}
          </p>
          <p>
          {t("home:about-p2 ")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
