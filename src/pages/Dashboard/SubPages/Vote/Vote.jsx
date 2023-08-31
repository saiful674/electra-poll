
import React, { useState } from 'react';
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const Vote = () => {

  const params = useParams();
  const id = params.id;

  // const {
  //   data: election = [],
  //   refetch,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["election", id],
  //   queryFn: async () => {
  //     const res = await axios.get(`http://localhost:5000/election/${id}`);
  //     return res.data;
  //   },
  // });

  // console.log(election);


  const initialQuestionsArray = [
    {
      id: 'xyz55519',
      voterChoose: 'option',
      vacancy: 1,
      options: [
        { id: 'xyz747rf056', option: 'Winter', votes: 0 },
        { id: 'xyz74ff7057', option: 'Summer', votes: 0 },
        { id: 'xyz74ffwe7057', option: 'Summer', votes: 0 },
        { id: 'xyz74fft7057', option: 'Summer', votes: 0 },
      ],
      choosedOptions: 1
    },
    {
      id: 'xyz55520',
      voterChoose: 'option',
      vacancy: 1,
      options: [
        { id: 'xyz747g056', option: 'Winter', votes: 0 },
        { id: 'xyz7470b57', option: 'Summer', votes: 0 },
        { id: 'xyz74h70b57', option: 'Summer', votes: 0 },
        { id: 'xyz7h470b57', option: 'Summer', votes: 0 },
      ],
      choosedOptions: 1
    },
    {
      id: 'xyz55521',
      voterChoose: 'option',
      vacancy: 1,
      options: [
        { id: 'xyz747df057', option: 'Summer', votes: 0 },
        { id: 'xyz74s7r056', option: 'Winter', votes: 0 },
        { id: 'xyz74s70ere56', option: 'Winter', votes: 0 },
        { id: 'xyz74s705h6', option: 'Winter', votes: 0 },
      ],
      choosedOptions: 1
    }
    // Add more question objects here if needed
  ];

  const [questionsArray, setQuestionsArray] = useState(initialQuestionsArray);
  const [voteCount, setVoteCount] = useState(0)

  const handleVote = (questionIndex, optionIndex) => {
    const updatedQuestionsArray = [...questionsArray];
    const selectedOption = updatedQuestionsArray[questionIndex].options[optionIndex];
    
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

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className='mt-24 my-container'>
      <div className="mx-auto px-4 border-t-[3px] rounded-md border-t-green-400 border w-4/6">
        
        {questionsArray?.map((question, questionIndex) => (
          <div key={question.id} className='my-5'>
            <h3>Question {questionIndex + 1}</h3>
            <p>Choose {question.choosedOptions} option(s)</p>
            {question.options.map((option, optionIndex) => (
              <div key={option.id}>
                <label>
                  <input
                    type="checkbox" 
                    checked={option.votes > 0}
                    onChange={() => handleVote(questionIndex, optionIndex)}
                    disabled={question.options.filter(opt => opt.votes > 0).length >= question.choosedOptions &&
                              option.votes === 0}
                  />
                  {option.option} - Votes: {option.votes}
                </label>
              </div>
            ))}
            <button onClick={() => handleChooseOptions(questionIndex, question.choosedOptions + 1)}>
              Increase Options
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vote;
