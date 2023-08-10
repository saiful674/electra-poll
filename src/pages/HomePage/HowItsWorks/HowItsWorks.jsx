import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaClipboardList, FaRocket, FaChartPie } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import dashboardImage from "../../../assets/How-it-work/dashboard.jpg";

const HowItsWorks = () => {
  return (
    <section className="my-container mb-20">
      <SectionTitle
        title="How it works"
        subTitle="Conducting online election on eVote is a simple 3 step process."
      ></SectionTitle>
      <div className="md:flex gap-2 items-center">
        <div className="">
          <div data-aos="fade-up" data-aos-duration="1400" className="card shadow-sm md:w-[700px]">
            <div className="card-body">
              <div className="md:flex gap-6 items-center">
                <div className="w-[90px] mx-auto">
                  <p className="bg-green-400 text-center text-white p-5 rounded-full text-5xl ">
                    <FaClipboardList />
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold mb-2">Create the Ballot</h1>
                  <p>
                    Add questions (i.e. positions) to your ballot and add
                    options (candidates, measures, write-in fields, etc.) to
                    your questions. Add a photo and/or short bio.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="1400" className="card shadow-sm md:w-[700px]">
            <div className="card-body">
              <div className="md:flex gap-6 items-center">
                <div className=" w-[90px] mx-auto">
                  <p className="bg-green-400 text-white p-5 rounded-full text-5xl ">
                    <FaPeopleGroup></FaPeopleGroup>
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold mb-2">Add Voters</h1>
                  <p>
                    You control who is eligible to vote in your elections. Add
                    voters one-by-one, or import them from a spreadsheet.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="1400" className="card shadow-sm md:w-[700px]">
            <div className="card-body">
              <div className="md:flex gap-6 items-center">
                <div className="w-[90px] mx-auto">
                  <p className="bg-green-400 text-white p-5 rounded-full text-5xl ">
                    <FaRocket />
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold mb-2">
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
          <div data-aos="fade-up" data-aos-duration="1400" className="card shadow-sm md:w-[700px]">
            <div className="card-body">
              <div className="md:flex gap-6 items-center">
                <div className="w-[90px] mx-auto">
                  <p className="bg-green-400 text-white p-5 rounded-full text-5xl ">
                    <FaChartPie />
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold mb-2">Monitor Results</h1>
                  <p>
                    Watch the results of your election in real-time. At the end
                    of the election you have the option to publish and share the
                    results with your voters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-duration="1400" data-aos-delay="200">
          <img src={dashboardImage} alt="" />
        </div>
      </div>
    </section>
  );
};

export default HowItsWorks;
