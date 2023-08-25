import axios from "axios";
import React, { useEffect, useState } from "react";
// import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";

const Vote = () => {
  const params = useParams();
  const id = params.id;
  const { control, handleSubmit } = useForm();
  const [election, setElection] = useState(null)



  useEffect(() => {
    axios.get(`https://electra-poll-server.vercel.app/election/${id}`).then((res) => {
      setElection(res.data);
    });
  }, []);

  console.log(election);

  const options = election && election?.questions[0].options

  const onSubmit = (data) => {
    console.log("Selected Option:", data);
    console.log(options);
    const voted = options.filter((option) => option.id == data.option)

    if (voted) {
      voted[0].votes++
    }
    console.log(voted)
    console.log(election.questions);

    axios.put(`https://electra-poll-server.vercel.app/election-vote-update/${id}`, {
      value: election.questions
    }).then((res) => {
      console.log(res.data);
    })
  };


  return (
    <div className="mt-24 my-container">
      <div className="mx-auto px-4 border-t-[3px] rounded-md border-t-green-400 border w-4/6">
        {/* section title */}
        <div className="mt-3 space-y-0">
          <h1 className="text-3xl font-bold ">{election?.title}</h1>
          <p className="text-sm">by maruf ahmed·8 minutes ago</p>
        </div>
        <div className="my-7">
          <div className="flex flex-col">
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Choose an option:
                  </label>
                  {election && options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Controller
                        name="option"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="radio"
                            value={option.id}
                            className="form-radio"
                          />
                        )}
                        rules={{ required: "Select an option" }}
                      />
                      <span>{option.option
                      }</span>
                    </label>
                  ))}
                </div>
                <div className=" flex justify-between ">
                  <div className="space-x-4">
                    <button type="submit"> <ButtonPrimary >Vote</ButtonPrimary></button>
                    <button type="button" className="btn btn-active rounded-md">Show results</button>
                  </div>
                  <button type="button" className=" btn bg-blue-200 rounded-md ">Share</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Vote;