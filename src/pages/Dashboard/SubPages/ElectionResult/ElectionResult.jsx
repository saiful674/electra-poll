import axios from "axios";
import React, { useEffect, useState } from "react";
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
    const electionData = {
      title: 'Sample Election',
      startDate: '2023-09-05',
      endDate: '2023-09-10',
      questions: [
        {
          questionTitle: 'Question 1',
          options: [
            { option: 'Option 1', votes: 50 },
            { option: 'Option 2', votes: 30 },
          ],
        },
        {
          questionTitle: 'Question 2',
          options: [
            { option: 'Option A', votes: 40 },
            { option: 'Option B', votes: 60 },
          ],
        },
      ],
    };
    
    
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
          <button className="hidden md:block" onClick={() => handleDownloadClick(id)}>
            <ButtonPrimary>Dwonload Result</ButtonPrimary>
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-2 font-medium text-gray-600 mt-5">
          <p>Email: {email}</p>
          <p>Security: {ballotAccess}</p>
          <p>Start Date: {formatDateToInputValue(startDate, timeZone)}</p>
          <p>End Date: {formatDateToInputValue(endDate, timeZone)}</p>
          <p>Status: {status}</p>
          <p>Timezone: {timeZone}</p>
          <p>Election Type: {voteType}</p>
          <button className="text-left md:hidden" onClick={() => handleDownloadClick(id)}>
            <ButtonPrimary>Dwonload Result excel</ButtonPrimary>
          </button>

          <button onClick={() => handleGeneratePDF(electionData)}>
            <ButtonPrimary>Dwonload Result pdf</ButtonPrimary>
          </button>
     
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
