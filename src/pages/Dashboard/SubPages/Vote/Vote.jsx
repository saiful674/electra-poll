import React, { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const Vote = () => {
  const params = useParams();
  const id = params.id;
  const [questionsArray, setQuestionsArray] = useState([]);
  const [voteCount, setVoteCount] = useState(0);


  const { data: electionArray = [], isLoading } = useQuery({
    queryKey: ["election", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/election/${id}`);
      setQuestionsArray(res.data.questions);
      return res.data;
    },
  });

  

  // if (isLoading) return "Loading...";

  // if (isError) return console.log(error.message);

  // console.log(electionArray);

  // const initialQuestionsArray = [
  //   {
  //     id: "xyz55519",
  //     voterChoose: "option",
  //     vacancy: 1,
  //     options: [
  //       { id: "xyz747rf056", option: "Winter", votes: 0 },
  //       { id: "xyz74ff7057", option: "Summer", votes: 0 },
  //       { id: "xyz74ffwe7057", option: "Summer", votes: 0 },
  //       { id: "xyz74fft7057", option: "Summer", votes: 0 },
  //     ],
  //     choosedOptions: 1,
  //   },
  //   {
  //     id: "xyz55520",
  //     voterChoose: "option",
  //     vacancy: 1,
  //     options: [
  //       { id: "xyz747g056", option: "Winter", votes: 0 },
  //       { id: "xyz7470b57", option: "Summer", votes: 0 },
  //       { id: "xyz74h70b57", option: "Summer", votes: 0 },
  //       { id: "xyz7h470b57", option: "Summer", votes: 0 },
  //     ],
  //     choosedOptions: 1,
  //   },
  //   // Add more question objects here if needed
  // ];

  const handleVote = (questionIndex, optionIndex) => {
    const updatedQuestionsArray = [...questionsArray];
    const selectedOption =
      updatedQuestionsArray[questionIndex].options[optionIndex];

    if (selectedOption.votes > 0) {
      selectedOption.votes -= 1;
    } else {
      if (updatedQuestionsArray[questionIndex].choosedOptions > 0) {
        // Only update if there are available choosedOptions
        selectedOption.votes += 1;
      }
    }

    setQuestionsArray(updatedQuestionsArray);
  };

  const handleChooseOptions = (questionIndex, selectedOptions) => {
    const updatedQuestionsArray = [...questionsArray];
    updatedQuestionsArray[questionIndex].choosedOptions = selectedOptions;
    setQuestionsArray(updatedQuestionsArray);
  };
  console.log(questionsArray);

  // console.log(questionsArray);

const handlePostVote = () => {
  console.log(questionsArray);

  axios.put(`http://localhost:5000/election-vote-update/${id}`, {
    value: questionsArray,
  }).then((res) => {
    console.log(res.data);
     // Update the state with modified data
  });

}
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-24 mb-5 my-container">
      <div className="mx-auto px-4 border-t-[3px] rounded-md border-t-green-400 border w-4/6">
        {questionsArray && questionsArray.length > 0 ? (
          <>
            {questionsArray?.map((question, questionIndex) => (
              <div key={question.id} className="my-5">
                <h3>Question {questionIndex + 1}</h3>
                <p className="my-1">
                  Choose {question.choosedOptions} option(s)
                </p>

                {question.options.map((option, optionIndex) => (
                  <div key={option.id}>
                    <label>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={option.votes > 0}
                        onChange={() => handleVote(questionIndex, optionIndex)}
                        disabled={
                          question.options.filter((opt) => opt.votes > 0)
                            .length >= question.choosedOptions &&
                          option.votes === 0
                        }
                      />
                      {option.option} - Votes: {option.votes}
                    </label>
                  </div>
                ))}

                <button
                  className="border border-indigo-600 px-1 my-2 rounded-md disabled:cursor-not-allowed"
                  onClick={() =>
                    handleChooseOptions(
                      questionIndex,
                      question.choosedOptions + 1
                    )
                  }
                  disabled={question.options.length === question.choosedOptions}
                >
                  Increase Options
                </button>
              </div>
            ))}
                <div className="my-5" onClick={handlePostVote}>
                <ButtonPrimary  type="button"> Submit</ButtonPrimary>
                </div>

          </>
        ) : (
          <p className="p-3 text-xl font-bold text-center">
            No voter data found
          </p>
        )}
      </div>
    </div>
  );
};

export default Vote;