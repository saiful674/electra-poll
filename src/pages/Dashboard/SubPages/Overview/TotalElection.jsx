import React, { useContext, useEffect, useState } from "react";
import { BsQuestionOctagonFill } from "react-icons/bs";
import { GiVote } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import getElection from "../../../../Hooks/getElection";
import { AuthContext } from "../../../../Providers/AuthProvider";
const TotalElection = () => {
  const [elections] = getElection();
  console.log("anis", elections);
  const { user } = useContext(AuthContext);
  const [voters, setVoters] = useState([]);
  let totalVoterEmailsArraysLength = 0;
  // console.log('totalVoterEmailsArraysLength', totalVoterEmailsArraysLength)
  
  for (const election of elections) { // Use a for...of loop to iterate through the array.
    const voterEmailsArray = election.voterEmails; // Access the voterEmails property.
    // console.log(voterEmailsArray, 'fghjdghj');
  
    if (Array.isArray(voterEmailsArray)) {
      // console.log('voterEmailsArray', voterEmailsArray);
      totalVoterEmailsArraysLength += voterEmailsArray.length;
    }
  }


  useEffect(() => {
      fetch(`${import.meta.env.VITE_URL}/election-by-completed/${user?.email}`)
          .then((res) => res.json())
          .then((data) => {
              console.log('election-by-completed', data);
              setVoters(data);
          });
  }, []);
  // console.log("anis", voters);

  let totalVotedTrueLength = 0;
  // console.log(totalVotedTrueLength)

  for (const voter of voters) {
    const voterEmailsArray = voter.voterEmails;
    for (const voterEmail of voterEmailsArray) {
      if (voterEmail && voterEmail.voted === true) {
        totalVotedTrueLength++;
      }
    }
  }
  
  

  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-6">
      <div className="h-40 bg-gradient-to-l from-blue-300 to-blue-500 rounded shadow p-4 flex justify-center items-center gap-6">
        <GiVote className="text-6xl  text-slate-50"></GiVote>
        <div className="flex flex-col justify-center items-center ">
          <h3 className="text-3xl text-slate-50 font-bold">Total Vote</h3>
          <p className="text-3xl text-slate-50 font-bold">{totalVotedTrueLength}</p>
        </div>
      </div>
      <div
        className="h-40 rounded shadow p-4 flex justify-center items-center gap-6"
        style={{ background: "linear-gradient(to right, #f000b8, #f06cb8)" }}
      >
        <HiUserGroup className="text-6xl  text-slate-50"></HiUserGroup>
        <div className="flex flex-col justify-center items-center ">
          <h3 className="text-3xl text-slate-50 font-bold">Total Voters</h3>
          <p className="text-3xl text-slate-50 font-bold">
            {totalVoterEmailsArraysLength}
          </p>
        </div>
      </div>
      <div className="h-40 bg-gradient-to-l from-green-300 to-green-500 rounded shadow p-4 flex justify-center items-center gap-6">
        <BsQuestionOctagonFill className="text-6xl  text-slate-50"></BsQuestionOctagonFill>
        <div className="flex flex-col justify-center items-center ">
          <h3 className="text-3xl text-slate-50 font-bold">Total Election</h3>
          {elections.length > 0 ? (
            <p className="text-3xl text-slate-50 font-bold">
              {elections.length}
            </p>
          ) : (
            <p className="text-3xl text-slate-50 font-bold">0</p>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TotalElection;
