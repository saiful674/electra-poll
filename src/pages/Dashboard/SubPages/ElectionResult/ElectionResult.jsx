import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import QuestionCard from "./QuestionCard";
import ResultOverview from "./ResultOverview";

const ElectionResult = () => {
  const [electionData, setElectionData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/election/${id}`)
      .then((res) => {
        setElectionData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  const handleDownloadClick = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/download-election-data/${id}`
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

  if (isLoading) {
    return LoadingSpinner;
  }
  return (
    <div className="mb-10">
      <h1 className="text-4xl text-center font-bold">Election Result</h1>
      <div className="md:flex justify-between ">
        <h2 className="text-2xl font-bold my-5">
          Election Title:{" "}
          <span className=" text-green-400">{electionData.title}</span>
        </h2>
        <button onClick={() => handleDownloadClick(id)} className="mb-5">
          <ButtonPrimary>Dwonload Result</ButtonPrimary>
        </button>
      </div>
      <ResultOverview electionData={electionData} />
      {electionData.questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          questionData={question}
          index={index}
        ></QuestionCard>
      ))}
    </div>
  );
};

export default ElectionResult;
