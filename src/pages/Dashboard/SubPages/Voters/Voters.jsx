import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Providers/AuthProvider";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";
import UserName from "../../../../components/Deshboard/UserName/UserName";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import ExcelToVoter from "./ExcelToVoter";
const Voters = () => {
  const { user } = useContext(AuthContext);

  const {
    data: data = [],
    refetch,
    isLoading,
  } = useQuery(["voters", user], async () => {
    const res = await axios.get(
      `https://electra-poll-server.vercel.app/voters/${user?.email}`
    );
    return res.data;
  });
  const voters = data?.voters;

  // add voter function
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const voterName = form.voterName.value;
    const voterEmail = form.email.value;
    const voterInfo = { email: user.email, voter: { voterName, voterEmail } };
    const modalCloseBtn = document.getElementById("my_modal_5");

    axios
      .post(`https://electra-poll-server.vercel.app/add-voters`, voterInfo)
      .then((data) => {
        if (data.data.modifiedCount >= 0) {
          Swal.fire({
            icon: "success",
            title: `You added ${voterName} as a voter`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        } else if (data.data.exist) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Voter already exists",
          });
        }
      });
    modalCloseBtn.close();
    form.reset();
  };

  // voter remove function
  const handleRemoveVoter = (voterEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://electra-poll-server.vercel.app/voters/${data?._id}`, {
            voterEmail,
          })
          .then((data) => {
            if (data.status === 200) {
              Swal.fire({
                icon: "success",
                title: `Your voter removed`,
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          });
      }
    });
  };

  // excel modal close function
  const closeModa4 = () => {
    const modalCloseBtn = document.getElementById("my_modal_4");
    modalCloseBtn.close();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <UserName></UserName>

      {/* whwn voter is zero/empty */}
      {(voters?.length === 0 || data.length === 0) && (
        <div className="flex flex-col h-[calc(100vh-135px)] justify-center items-center space-y-2">
          <div className="flex gap-3 items-center">
            <FaUsers className="w-10 h-10" />
            <h6 className="text-xl font-medium"> Add Voters</h6>
          </div>
          <p>You can add voters using their email.</p>
          <button onClick={() => window.my_modal_5.showModal()}>
            <ButtonPrimary>Add Voters</ButtonPrimary>
          </button>
          <button onClick={() => window.my_modal_4.showModal()}>
            <ButtonPrimary>Upload Voters</ButtonPrimary>
          </button>
        </div>
      )}

      {/* when voter data length is more then 0 */}
      {voters?.length > 0 && (
        <>
          <div className="text-right space-x-2">
            <button onClick={() => window.my_modal_5.showModal()}>
              <ButtonPrimary>Add Voters</ButtonPrimary>
            </button>
            <button onClick={() => window.my_modal_4.showModal()}>
              <ButtonPrimary>Upload Voters</ButtonPrimary>
            </button>
          </div>
          <div className="overflow-x-auto mt-5">
            <table className="table table-zebra-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th className="bg-teal-900 text-white">#</th>
                  <th className="bg-teal-900 text-white">Voter Name</th>
                  <th className="bg-teal-900 text-white">Voter Email</th>
                  <th className="bg-teal-900 text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {voters?.map((voterInfo, index) => (
                  <tr key={index} className="bg-base-200">
                    <th>{index + 1}</th>
                    <td>{voterInfo?.voterName}</td>
                    <td>{voterInfo?.voterEmail}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveVoter(voterInfo.voterEmail)}
                        className="btn btn-error text-sm btn-sm normal-case"
                      >
                        <FaTrashAlt className="h-3 w-3" /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* add single voter modal */}
      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-xl font-bold mb-5 text-center">Add Voter </h2>
          <form method="dialog">
            <button
              id="modal-close-btn"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Voter Name</label>
              <input
                type="text"
                name="voterName"
                className="voter-input mt-2"
                placeholder="Saiful Islam"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="">Voter Email</label>
              <input
                type="email"
                name="email"
                className="voter-input mt-2"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="mt-5 text-center">
              <button>
                <ButtonPrimary>Add</ButtonPrimary>
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 lg:w-3/5 max-w-5xl">
          <h2 className="text-xl font-bold mb-5 text-center">Add Voter </h2>
          <form method="dialog">
            <button
              id="modal-close-btn"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="mt-5 text-center">
              <ExcelToVoter
                closeModa4={closeModa4}
                refetch={refetch}
              ></ExcelToVoter>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Voters;
