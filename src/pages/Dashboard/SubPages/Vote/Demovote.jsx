import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const Vote = () => {
  const params = useParams();
  const id = params.id;
  const { control, handleSubmit } = useForm();

  const [multipleSelection, setMultipleSelection] = useState(false); // Toggle state
  const {
    data: election = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["elections", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/election/${id}`);
      return res.data;
    },
  });

  console.log(election);

  const onSubmit = (data) => {
    // Your voting submission logic here
    console.log(data);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-24 my-container">
      <div className="mx-auto px-4 border-t-[3px] rounded-md border-t-green-400 border w-4/6">
        <div>
          <h3 className="text-xl font-bold uppercase mt-5">{election.title}</h3>
        </div>
        <div className="mt-4">
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={multipleSelection}
              onChange={() => setMultipleSelection(!multipleSelection)}
              className="form-checkbox"
            />
            <span className="text-sm">
              {multipleSelection ? "Multiple Selection" : "Single Selection"}
            </span>
          </label>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {election?.questions.map((question) => (
            <div className="mt-4" key={question?.id}>
              <h3 className="font-bold text-lg">
                Q: {question.choosedOptions} {question.questionTitle} ?
              </h3>
              <p className="">
                Choose your {question.voterChoose} :
              </p>
              {question.options.map((option) => (
                <label
                key={`${question.id}-${option.id}`}
                className="flex items-center space-x-2 cursor-pointer"
                >
                  <Controller
                    name={`option.${question.id}`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type={multipleSelection ? "checkbox" : "radio"}
                        value={option.id}
                        className="form-radio"
                      />
                    )}
                  />
                  <span>{option.option}</span>
                </label>
              ))}
            </div>
          ))}
          <div className="mt-4">
            <button type="submit">
              <ButtonPrimary>Vote</ButtonPrimary>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Vote;

