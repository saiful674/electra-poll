import React, { Component, useContext } from "react";
import { useState } from "react";
import { read, utils } from "xlsx";
import excelSS from "../../../../assets/excelSS.png";
import { AuthContext } from "../../../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

function ExcelToVoter({ closeModa4, refetch }) {
  const [voterEmails, setVoterEmails] = useState([]);
  const { user } = useContext(AuthContext);

  const handleExcelUpload = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const inputData = await file.arrayBuffer();
      const wb = read(inputData);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsondata = utils.sheet_to_json(ws);
      if (jsondata[0].Email) {
        const voters = [];
        jsondata.forEach((data) =>
          voters.push({ voterName: data.Name, voterEmail: data.Email })
        );
        setVoterEmails(voters);
      } else {
        setVoterEmails({ error: true });
      }
    } else {
      setVoterEmails([]);
    }
  };

  console.log(voterEmails);

  const handleAddVoters = () => {
    const fileInputField = document.getElementById("file-input");
    if (voterEmails.length > 0 && !voterEmails.error) {
      axios
        .patch(`${import.meta.env.VITE_URL}/add-excel-voters`, {
          email: user.email,
          voterEmails,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
            refetch();
            Swal.fire({
              icon: "success",
              title: `voters added successfully`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (res.data.voterExist === true) {
            refetch();
            Swal.fire({
              icon: "error",
              title: `voters already exist`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          fileInputField.value = "";
          setVoterEmails([]);
        })
        .catch((error) => {
          if (error) {
            Swal.fire({
              icon: "error",
              title: `something went wrong try again`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      closeModa4();
    }
  };

  return (
    <div className="my-container">
      <div className="flex gap-3 flex-col items-center">
        <h1 className="text-xl text-green-500">
          Make sure your excel file is in this format.
        </h1>
        <img src={excelSS} alt="" className="w-72 lg:w-full" />
        <div className="flex flex-col">
          {!voterEmails.error && voterEmails.length > 0 ? (
            <h1 className="text-green-500">format is ok.able to upload</h1>
          ) : voterEmails.error ? (
            <h1 className="text-red-500">
              wrong format. make user you excel data is in right format.
            </h1>
          ) : (
            ""
          )}
        </div>
        <div className="flex gap-3">
          <label className="w-20 h-10 flex justify-center items-center bg-gray-400 rounded-md text-white cursor-pointer">
            upload
            <input
              onChange={(e) => handleExcelUpload(e)}
              type="file"
              accept=".xlsx, .xls"
              hidden
              id="file-input"
            />
          </label>
          <button
            type="button"
            onClick={handleAddVoters}
            className="button-next"
          >
            Add Voters
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExcelToVoter;
