import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useParams } from "react-router-dom";
import { formatDateToInputValue } from "../../../../Hooks/convertDate";
import { generatePDF } from "../../../../Hooks/genaratePDF";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import QuestionCard from "./QuestionCard";
import ResultOverview from "./ResultOverview";
const ElectionResult = () => {
  const [electionData, setElectionData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { email, ballotAccess, endDate, startDate, status, timeZone, voteType } = electionData
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/election/${id}`)
      .then((res) => {
        setElectionData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);
  console.log(electionData)
  const handleDownloadClick = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/download-election-data/${id}`
      );
      const blob = await response.blob();

      // Create a blob URL and simulate download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "election_results.xls";
      a.click();

      // Clean up the blob URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };


  const handleGeneratePDF = (data) => {
      generatePDF(data);

  };


  if (isLoading) {
    return <LoadingSpinner />
  }

  return (

    <div className="mb-10">
      <h1 className="text-4xl text-center font-bold">Election Result</h1>
      <div className="bg-white p-5 rounded my-10">
        <div className="md:flex justify-between">
          <h2 className="text-2xl font-bold my-5">
            Election Title:
            <span className=" text-green-400"> {electionData.title}</span>
          </h2>

          <div className="hidden md:block dropdown dropdown-end dropdown-hover">
            <label tabIndex={0} className="">
              <ButtonPrimary><span className="flex items-center gap-1">Dwonload Result <MdOutlineArrowDropDown className="h-5 w-5"/> </span></ButtonPrimary>
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <button onClick={() => handleGeneratePDF(electionData)}>
                  In A PDF File
                </button>
              </li>
              <li>
                <button className="hidden md:block" onClick={() => handleDownloadClick(id)}>
                  In A Excel File
                </button>
              </li>

            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-2 font-medium text-gray-600 mt-5">
          <p>Email: {email}</p>
          <p>Security: {ballotAccess}</p>
          <p>Start Date: {formatDateToInputValue(startDate, timeZone)}</p>
          <p>End Date: {formatDateToInputValue(endDate, timeZone)}</p>
          <p>Status: {status}</p>
          <p>Timezone: {timeZone}</p>
          <p>Election Type: {voteType}</p>
          <div className="md:hidden dropdown dropdown-end dropdown-hover">
            <label tabIndex={0} className="">
              <ButtonPrimary><span className="flex items-center gap-1">Dwonload Result <MdOutlineArrowDropDown className="h-5 w-5"/> </span></ButtonPrimary>
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <button onClick={() => handleGeneratePDF(electionData)}>
                  In A PDF File
                </button>
              </li>
              <li>
                <button onClick={() => handleDownloadClick(id)}>
                  In A Excel File
                </button>
              </li>

            </ul>
          </div>

        </div>
      </div>
      <ResultOverview electionData={electionData} />
      <div>
        {electionData.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            questionData={question}
            index={index}
          ></QuestionCard>
        ))}
      </div>
    </div>
  );
};

export default ElectionResult;
