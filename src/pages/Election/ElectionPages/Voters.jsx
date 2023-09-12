import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  addVoterRow,
  next,
  previous,
  removeVoterEmail,
  setEmailValid,
  updateAccessKey,
  updateVotePassword,
  updateVoterEmail,
} from "../../../redux/slices/FormDataSlice";

const Voters = () => {
  const dispatch = useDispatch();
  const [emailErrors, setEmailErrors] = useState(false);
  const formData = useSelector((state) => state.formData);
  const {
    _id,
    email,
    voteType,
    voterEmails,
    emailsValid,
    status,
    ballotAccess,
  } = formData;

  useEffect(() => {
    if (voterEmails.length === 0) {
      dispatch(addVoterRow());
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setEmailErrors(false);
    const voterAccessKey = data.accessKey;
    const voterAccessPassword = Math.floor(data.password)

    if (status === "pending") {
      axios
        .patch(`${import.meta.env.VITE_URL}/election/${formData._id}`, {
          ...formData,
          voterAccessKey,
          voterAccessPassword,
        })
        .then((res) => {
          if (res.data) {
          }
        });
    }
    dispatch(setEmailValid(true));
  };

  const handleNext = () => {
    if (emailsValid && voterEmails.length >= 1) {
      dispatch(next());
    } else {
      setEmailErrors("please validate emails first and add atleast one voter");
    }
  };

  const handleAddVoter = () => {
    if (voteType === "test" && voterEmails.length >= 5) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cannot add more than 5 voters in test vote!",
      });
    } else {
      dispatch(addVoterRow());
    }
  };

  const handleRemove = (id) => {
    dispatch(removeVoterEmail(id));
    reset();
  };

  const handleUpdateEmail = (id, email) => {
    const existingEmail = voterEmails.find((voter) => voter.email === email);
    if (existingEmail) {
      setEmailErrors("duplicate email");
      duplicateEmails.push(existingEmail.email);
      return;
    }
    dispatch(updateVoterEmail({ id, email }));
    dispatch(setEmailValid(false));
  };

  const handleAddSavedVoters = () => {
    if (voteType === "test") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cannot add saved voters in test vote!",
      });
    } else {
      axios.get(`${import.meta.env.VITE_URL}/voters/${email}`).then((res) => {
        const voters = res.data.voters;
        for (let voter of voters) {
          dispatch(addVoterRow(voter.voterEmail));
        }
      });
    }
  };

  return (
    <div className="w-full bg-gray-50 p-3 lg:p-10">
      <h1 className="text-2xl font-bold pb-3">Add Voters</h1>
      {Object.keys(errors).length !== 0 && (
        <div className="bg-red-100 border-l-4 h-20 flex items-center text-lg border-red-600">
          <ul className="list-decimal ps-6">
            {errors.accessKey && (
              <li>Access key required for voter to access ballot</li>
            )}
            {errors.password && (
              <li>Password required for voter to access ballot</li>
            )}
          </ul>
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {ballotAccess === "medium" && (
              <div className="mb-10">
                <div className="form-control">
                  <label className="label">
                    <span className="text-lg font-semibold">
                      Voter Access Key
                      <span className="text-red-400">&#9998;</span>
                    </span>
                  </label>
                  <input
                    maxLength={20}
                    onInput={(e) => {
                      dispatch(updateAccessKey(e.target.value));
                      dispatch(setEmailValid(false));
                    }}
                    disabled={status !== "pending"}
                    {...register("accessKey", {
                      required: status === "pending",
                      minLength: { value: 10 },
                    })}
                    placeholder="add access key for voters"
                    type="text"
                    defaultValue={formData.voterEmails[0]?.accessKey || ""}
                    className="my-input focus:outline-green-400"
                  />
                  {errors.accessKey && (
                    <p className="text-red-400">
                      Access key should be atleast 10 charecters
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-lg font-semibold">
                      Voter Password
                      <span className="text-red-400">&#9998;</span>
                    </span>
                  </label>
                  <input
                    onInput={(e) => {
                      dispatch(updateVotePassword(e.target.value));
                      dispatch(setEmailValid(false));
                    }}
                    disabled={status !== "pending"}
                    {...register("password", {
                      required: status === "pending",
                      minLength: { value: 6 },
                    })}
                    placeholder="add password for voters"
                    type="number"
                    defaultValue={formData.voterEmails[0]?.password || ""}
                    className="my-input focus:outline-green-400"
                  />
                  {errors.password && (
                    <p className="text-red-400">
                      Password should be atleast 6 charecters
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="space-x-4">
              <button
                disabled={status !== "pending"}
                type="button"
                className="bg-gray-500 text-white px-3 py-1 rounded-md"
                onClick={handleAddVoter}
              >
                Add Row
              </button>
              <button
                disabled={status !== "pending"}
                type="button"
                className="bg-gray-500 text-white px-3 py-1 rounded-md"
                onClick={handleAddSavedVoters}
              >
                Add Saved Voters
              </button>
            </div>

            <div className="overflow-y-auto max-h-96 overflow-x-auto">
              <table className="w-full mt-4 table text-center">
                <thead>
                  <tr className="text-lg">
                    <th>ID</th>
                    <th>Email</th>
                    {ballotAccess !== "low" && (
                      <>
                        <th>AccessKey</th>
                        <th>Password</th>
                      </>
                    )}
                    <th></th>
                  </tr>
                </thead>
                <tbody className="p-0">
                  {voterEmails.map((row, index) => (
                    <tr key={row.id}>
                      <td className="w-12">{index + 1}</td>
                      <td className="w-full flex gap-1 my-1">
                        <div className="w-full">
                          <input
                            disabled={status !== "pending"}
                            {...register(`voterEmail${row.id}`, {
                              required: true,
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                              },
                            })}
                            autoComplete="off"
                            type="text"
                            className={
                              errors[`voterEmail${row.id}`]
                                ? "bg-red-300 h-8 w-full px-2"
                                : "bg-gray-200 h-8 w-full"
                            }
                            defaultValue={row.email}
                            onChange={(e) =>
                              handleUpdateEmail(row.id, e.target.value)
                            }
                          />
                        </div>
                      </td>
                      {ballotAccess !== "low" && (
                        <>
                          <td>
                            <p>{row.accessKey}</p>
                          </td>
                          <td>
                            <p>{row.password}</p>
                          </td>
                        </>
                      )}
                      <td>
                        <button type="button">
                          <FaTrash
                            onClick={() => handleRemove(row.id)}
                            className="inline"
                          ></FaTrash>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center">
            {emailErrors && <p className="text-red-400">{emailErrors}</p>}
          </div>
          <div className="flex justify-center">
            <button
              disabled={status !== "pending"}
              className="px-4 py-1 bg-green-400 rounded-md mt-3 text-white"
              type="submit"
            >
              validate
            </button>
          </div>
        </form>
        <div className="pt-5 flex justify-between">
          <button
            onClick={() => dispatch(previous())}
            type="button"
            className="button-pre"
          >
            Back
          </button>
          <button onClick={handleNext} type="button" className="button-next">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Voters;
