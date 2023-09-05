import React, { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Vote = ({ election }) => {
  const params = useParams();
  const [questionsArray, setQuestionsArray] = useState([]);
  const navigate = useNavigate();
  const [checkedOptions, setCheckedOptions] = useState({});



  const { data: electionArray = [], isLoading } = useQuery({
    queryKey: ["election", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/election/${id}`);
      setQuestionsArray(res.data.questions);

      return res.data;
    },
  });
  // console.log(questionsArray);



  // const handleOptionChange = (questionIndex, optionId) => {

  //   console.log(questionIndex, optionId);
  //   const updatedCheckedOptions = { ...checkedOptions };

  //   if (updatedCheckedOptions[questionIndex] === undefined) {
  //     updatedCheckedOptions[questionIndex] = [];
  //   }

  //   if (updatedCheckedOptions[questionIndex].includes(optionId)) {
  //     // Uncheck the option
  //     updatedCheckedOptions[questionIndex] = updatedCheckedOptions[questionIndex].filter(
  //       (id) => id !== optionId
  //     );
  //   } else {
  //     // Check the option
  //     updatedCheckedOptions[questionIndex].push(optionId);
  //   }

  //   setCheckedOptions(updatedCheckedOptions);
  // };


  const handleOptionChange = (questionIndex, optionId) => {
    const updatedCheckedOptions = { ...checkedOptions };
    const question = questionsArray[questionIndex];  // Fetch the question using the passed index

    if (updatedCheckedOptions[questionIndex] === undefined) {
      updatedCheckedOptions[questionIndex] = [];
    }

    const currentlyCheckedOptions = updatedCheckedOptions[questionIndex];

    // If the option is already checked, uncheck it
    if (currentlyCheckedOptions.includes(optionId)) {
      updatedCheckedOptions[questionIndex] = currentlyCheckedOptions.filter(id => id !== optionId);
    } else {
      // If the maximum number of selections is reached, uncheck the first one
      if (currentlyCheckedOptions.length >= question.choosedOptions) {
        currentlyCheckedOptions.shift(); // Remove the first/earliest option
      }

      // Add the new option
      currentlyCheckedOptions.push(optionId);
    }

    setCheckedOptions(updatedCheckedOptions);
  };










  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const updatedQuestionsArray = [...questionsArray];

    updatedQuestionsArray.forEach((question, questionIndex) => {

      question.options.forEach((option, optionIndex) => {
        // console.log(option.id);
        if (data[option.id]) {
          const originalOption = questionsArray[questionIndex].options.find(
            (originalOption) => originalOption.id === option.id
          );
          if (originalOption) {
            originalOption.votes += 1;
          }


        }
      })
    })
    console.log(updatedQuestionsArray);

    axios
      .put(`http://localhost:5000/election-vote-update/${id}`, {
        value: updatedQuestionsArray,
      })
      .then((res) => {
        console.log(res.data);
        // Update the state with modified data
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You successfully submit your vote",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/dashboard/election-correction`);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You already submit your vote. Don't try again",
          });
          navigate(`/dashboard/election-correction`);
        }
      });

  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mb-5 w-screen">
      <div className="mx-auto px-4 border-t-[3px] rounded-md border-t-green-400 border w-4/6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {questionsArray?.map((question, questionIndex) => (
            <div key={question.id} className="my-5">
              <h3 className="font-bold">
                Q{questionIndex + 1} {question.questionTitle}{" "}
              </h3>
              <p className="my-1">Choose {question.choosedOptions} </p>

              {question.options.map((option, optionIndex) => (
                <div key={option.id}>
                  <label>
                    <Controller
                      name={option.id}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          onInput={() => handleOptionChange(questionIndex, option.id)}
                          checked={
                            checkedOptions[questionIndex]?.includes(option.id) ||
                            false
                          }

                          // disabled={
                          //   checkedOptions[questionIndex]?.length ===
                          //   question.choosedOptions
                          // }
                          type="checkbox" {...field} />
                      )}
                    />
                    {option.option}
                  </label>

                </div>
              ))}

            </div>
          ))}

          <button type="submit">
            {" "}
            <ButtonPrimary> Submit</ButtonPrimary>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Vote;
