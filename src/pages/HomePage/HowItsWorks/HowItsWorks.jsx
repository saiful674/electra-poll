import Aos from "aos";
import React, { useEffect } from "react";
import { FaChartPie, FaClipboardList, FaRocket } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import dashboardImage from "../../../assets/How-it-work/dashboard2.png";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useTranslation } from "react-i18next";


const HowItsWorks = () => {
  const {t}=useTranslation(["home","common"])


  useEffect(() => {
    Aos.init({
      duration: 800
    })
  }, [])

  return (
    <section className="my-container mb-20">
       <SectionTitle
        title={`${t("home:howItWorks-title")}`}
        subTitle={`${t("home:howItWorks-subTitle")}`}
      ></SectionTitle>
      <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-3 divide-y-2">
          <div data-aos="fade-up" data-aos-duration="800" className="">
            <div className="">
              <div className="flex gap-6 items-center">
                <div className="w-[90px] mx-auto">
                  <p className="bg-green-400 text-center text-white p-5 rounded-full text-5xl ">
                    <FaClipboardList />
                  </p>
                </div>
                <div className="">
                  <h1 className="text-xl font-bold mb-1">{t("home:howItWorks-title1")}</h1>
                  <p>
                  {t("home:howItWorks-description1")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="800" className="pt-3">
            <div className="">
              <div className="flex gap-6 items-center">
                <div className=" w-[90px] mx-auto">
                  <p className="bg-green-400 text-white p-5 rounded-full text-5xl ">
                    <FaPeopleGroup></FaPeopleGroup>
                  </p>
                </div>
                <div className="">
                <h1 className="text-xl font-bold mb-1">{t("home:howItWorks-title2")}</h1>
                <p>
                  {t("home:howItWorks-description2")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="800" className="pt-3">
            <div className="">
              <div className="flex gap-6 items-center">
                <div className="w-[90px] mx-auto">
                  <p className="bg-green-400 text-white p-5 rounded-full text-5xl ">
                    <FaRocket />
                  </p>
                </div>
                <div className="">
                <h1 className="text-xl font-bold mb-1">{t("home:howItWorks-title3")}</h1>

                <p>
                  {t("home:howItWorks-description3")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="800" className="pt-3">
            <div className="">
              <div className="flex gap-6 items-center">
                <div className="w-[90px] mx-auto">
                  <p className="bg-green-400 text-white p-5 rounded-full text-5xl ">
                    <FaChartPie />
                  </p>
                </div>
                <div className="">
                <h1 className="text-xl font-bold mb-1">{t("home:howItWorks-title4")}</h1>
                <p>
                  {t("home:howItWorks-description4")}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Link to='/dashboard/election-correction'>
              <ButtonPrimary>{t("common:CreateAPoll")}</ButtonPrimary>
              </Link>
            </div>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="200" className="">
          <img src={dashboardImage} alt="dashboard image" className="w-full h-[500px] bg-contain" />
        </div>
      </div>
    </section>
  );
};

export default HowItsWorks;
