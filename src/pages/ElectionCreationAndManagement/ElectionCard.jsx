import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { formatDateToInputValue } from "../../Hooks/convertDate";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import useElectionTimer from "../../Hooks/useElectionTimer";

const ElectionCard = ({ election, refetch, isUseForResultPage }) => {

  const {
    _id,
    title,
    status,
    startDate,
    timeZone,
    autoDate,
    endDate,
    organization,
    voteType,
    voterEmails,
  } = election;

  const { timeLeft, timeDifference } = useElectionTimer(endDate)
  console.log(timeDifference);


  const handleElectionDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/remove-election/${_id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount) {
              refetch();
              Swal.fire(
                "Deleted!",
                "Your election has been deleted",
                "success"
              );
            }
          });
      }
    });
  };

  return (
    <div className="border flex justify-between flex-col cursor-pointer rounded-2xl shadow-md p-4 mb-4 ">
      <div className="space-y-2 text-xl text-gray-500">
        {title ? (
          <Link
            to={`/election/${_id}`}
            className="text-xl font-semibold mb-2 block hover:underline hover:text-red-500  uppercase"
          >
            {title}
          </Link>
        ) : (
          <Link
            to={`/election/${_id}`}
            className=" text-xl font-semibold mb-2 block hover:underline  hover:text-red-500  uppercase"
          >
            Please create your election title
          </Link>
        )}
        <p>Organization: {organization}</p>
        <p>
          Status: {status} | {voteType} Vote
        </p>
        <p>
          Voting Ends in:{" "}
          <span
            className={
              timeDifference <= 3
                ? "text-red-400"
                : "text-green-500"
            }
          >
            {timeLeft || 'election ended'}
          </span>
        </p>
        <p>Start: {startDate && formatDateToInputValue(startDate, timeZone)}</p>
        <p>End: {endDate && formatDateToInputValue(endDate, timeZone)}</p>
        {voterEmails && <p>Voters: {voterEmails.length}</p>}
      </div>
      {isUseForResultPage ? (
        <Link to={`/dashboard/election-result/${_id}`} className="text-right">
          <ButtonPrimary>View Result</ButtonPrimary>
        </Link>
      ) : (
        <div
          onClick={handleElectionDelete}
          className="flex justify-end items-center gap-1 text-red-400"
        >
          <p className="text-xl">Delete</p>
          <FaTrash></FaTrash>
        </div>
      )}

      {/* <Link className='text-right'>
                <ButtonPrimary>Share election </ButtonPrimary>
            </Link> */}
    </div>
  );
};

export default ElectionCard;
