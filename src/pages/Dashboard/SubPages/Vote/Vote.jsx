import React, { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Vote = () => {
  const params = useParams();
  const id = params.id;
  const [questionsArray, setQuestionsArray] = useState([]);

  const { data: electionArray = [], isLoading } = useQuery({
    queryKey: ["election", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/election/${id}`);
      setQuestionsArray(res.data.questions);
      return res.data;
    },
  });
  console.log(questionsArray)

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-24 mb-5 my-container">
      <div className="mx-auto px-4 border-t-[3px] rounded-md border-t-green-400 border w-4/6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {questionsArray?.map((question, questionIndex) => (
            <div key={question.id} className="my-5">
              <h3 className="font-bold">Q{questionIndex + 1} {question.questionTitle} </h3>
              <p className="my-1">Choose {question.choosedOptions} </p>

              {question.options.map((option, optionIndex) => (
                <div key={option.id}>
                  <label>
                    <Controller
                      name={option.id}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input type="checkbox" {...field} />
                      )}
                    />
                    {option.option}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Vote;
