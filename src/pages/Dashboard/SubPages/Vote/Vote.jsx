import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";

const Vote = () => {
  const params = useParams();
  const id = params.id;
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    axios.get(`http://localhost:5000/election/${id}`).then((res) => {
      console.log(res.data);
    });
  }, []);

  const options = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ];

  const onSubmit = (data) => {
    console.log("Selected Option:", data);
    // You can perform further actions here, like sending data to the server
  };

  return (
    <div className="mt-24 my-container">
      <div className="mx-auto px-4 border-t-[3px] rounded-md border-t-green-400 border w-4/6">
        {/* section title */}
        <div className="mt-3 space-y-0">
          <h1 className="text-3xl font-bold ">Who is Best</h1>
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
                  {options.map((option) => (
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
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <div className=" flex justify-between ">
         <div className="space-x-4">
         <button type="submit"> <ButtonPrimary > Vote</ButtonPrimary></button>
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
