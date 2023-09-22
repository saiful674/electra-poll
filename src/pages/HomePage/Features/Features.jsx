import { AiOutlineMobile } from "react-icons/ai";
import { BsPieChart } from "react-icons/bs";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdOutlineVpnKey, MdSupportAgent } from "react-icons/md";
import { RxAccessibility } from "react-icons/rx";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useEffect } from "react";
import Aos from "aos";
import { useTranslation } from "react-i18next";
const Features = () => {
  const {t}=useTranslation(["home","common"])


  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);

  return (
<<<<<<< HEAD
    <section className="my-container mb-20">
      <SectionTitle
        title={`${t("home:features-title")}`}
        subTitle={`${t("home:features-subTitle")}`}
      ></SectionTitle>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        <div
          className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <MdOutlineVpnKey className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">
            {t("home:features-title1")}
          </h3>
          <p>{t("features-description1")}</p>
        </div>
        <div
          className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <AiOutlineMobile className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">
            {t("home:features-title2")}
          </h3>
          <p>{t("features-description2")}</p>
        </div>
        <div
          className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <RxAccessibility className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">
            {t("home:features-title3")}
          </h3>
          <p>{t("features-description3")}</p>
        </div>
        <div
          className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <BsPieChart className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">
            {t("home:features-title4")}
          </h3>
          <p>{t("features-description4")}</p>
        </div>

        <div
          className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <HiOutlineLockClosed className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">
            {t("home:features-title5")}
          </h3>
          <p>{t("features-description5")}</p>
        </div>
        <div
          className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <MdSupportAgent className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">
            {t("home:features-title6")}
          </h3>
          <p>{t("features-description6")}</p>
=======
    <section className="mb-20 py-20 dark:bg-[#282828] dark:text-white">
      <div className="my-container">
        <SectionTitle
          title={"Features"}
          subTitle={
            "ElectraPoll Provides All The Capabilities You Need To Create And Manage A Successful Poll."
          }
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <div
            className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <MdOutlineVpnKey className="h-16 w-16 text-teal-500 mx-auto" />
            <h3 className="font-bold text-xl mt-3 mb-2">Secure Voting</h3>
            <p>
              Each voter has a unique "Voter ID" and "Voter Key" and those have
              voter ID and Key they can only vote once.
            </p>
          </div>
          <div
            className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <AiOutlineMobile className="h-16 w-16 text-teal-500 mx-auto" />
            <h3 className="font-bold text-xl mt-3 mb-2">Mobile Ready</h3>
            <p>
              Elections are optimized for desktop and mobile devices. Voters can
              vote from a web browser
            </p>
          </div>
          <div
            className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <RxAccessibility className="h-16 w-16 text-teal-500 mx-auto" />
            <h3 className="font-bold text-xl mt-3 mb-2">Accessibility</h3>
            <p>
              The voting application targets Section 508 and WCAG 2.0 AA
              compliance.
            </p>
          </div>
          <div
            className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <BsPieChart className="h-16 w-16 text-teal-500 mx-auto" />
            <h3 className="font-bold text-xl mt-3 mb-2">Results Tabulation</h3>
            <p>
              Election results are automatically calculated and presented with
              beautiful charts.
            </p>
          </div>

          <div
            className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <HiOutlineLockClosed className="h-16 w-16 text-teal-500 mx-auto" />
            <h3 className="font-bold text-xl mt-3 mb-2">256-Bit Encryption</h3>
            <p>
              All elections have SSL grade security with 256bit encryption that
              keeps your election and ballots secure.
            </p>
          </div>
          <div
            className="text-center border hover:border-1 hover:border-slate-500 rounded-md p-3 transition cursor-pointer"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <MdSupportAgent className="h-16 w-16 text-teal-500 mx-auto" />
            <h3 className="font-bold text-xl mt-3 mb-2">Amazing Support</h3>
            <p>
              Have a question? Need help? Our support team averages a response
              time of 8 minutes during business hours.
            </p>
          </div>
>>>>>>> 84e0b9f28f354f890fa22ccf117845d319cd3205
        </div>
      </div>
    </section>
  );
};

export default Features;
