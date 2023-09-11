import Aos from "aos";
import React, { useEffect } from "react";
import { FaChartPie, FaClipboardList, FaRocket } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import dashboardImage from "../../../assets/How-it-work/dashboard2.png";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const HowItsWorks = () => {

  useEffect(() => {
    Aos.init({
      duration: 800
    })
  }, [])

  return (
    <section className="my-container mb-20">
      <SectionTitle
        title="How it works"
        subTitle="Conducting online election on eVote is a simple 3 step process."
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
                  <h1 className="text-xl font-bold mb-1">Create the Ballot</h1>
                  <p>
                    Add questions (i.e. positions) to your ballot and add
                    options (candidates, measures, write-in fields, etc.) to
                    your questions. Add a photo and/or short bio.
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
                  <h1 className="text-xl font-bold mb-1">Add Voters</h1>
                  <p>
                    You control who is eligible to vote in your elections. Add
                    voters one-by-one, or import them from a spreadsheet.
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
                  <h1 className="text-xl font-bold mb-1">
                    Launch the Election
                  </h1>
                  <p>
                    When you're done customizing the election, you can schedule
                    a start/end date or immediately launch it.
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
                  <h1 className="text-xl font-bold mb-1">Monitor Results</h1>
                  <p>
                    Watch the results of your election in real-time. At the end
                    of the election you have the option to publish and share the
                    results with your voters.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <ButtonPrimary>Create A Poll</ButtonPrimary>
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
