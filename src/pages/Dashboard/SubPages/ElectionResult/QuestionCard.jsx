import React from "react";
import ResultChart from "./ResultChart";

const QuestionCard = ({ questionData, index }) => {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 dark:text-gray-300 shadow mt-5 rounded">
      <h3 className="text-xl font-bold">
        {index + 1}. Question: {questionData.questionTitle}
      </h3>
      <div>
        <ResultChart questionData={questionData}></ResultChart>
      </div>
    </div>
  );
};

export default QuestionCard;
