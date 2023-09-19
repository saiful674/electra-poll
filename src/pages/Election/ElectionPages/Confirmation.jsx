import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createNewDate } from "../../../Hooks/createNewDate";
import { previous } from "../../../redux/slices/FormDataSlice";

const Confirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((s) => s.formData);
  const {
    title,
    selectedTime,
    autoDate,
    startDate,
    endDate,
    questions,
    voterEmails,
    ballotAccess,
    status,
  } = formData;

  const handeConfirmation = () => {
    if (status === "pending") {
      Swal.fire({
        title: "Have you checked all the information?",
        text: "You won't be able to update a ballot after publishing!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Publish it",
      }).then((result) => {
        if (result.isConfirmed) {
          if (selectedTime === "option1") {
            const newStartDate = createNewDate(formData.timeZone);
            const dateObject = new Date(newStartDate);

            const newEndDate = new Date(dateObject.getTime());
            newEndDate.setMinutes(dateObject.getMinutes() + formData.autoDate);

            axios
              .patch(`${import.meta.env.VITE_URL}/election/${formData._id}`, {
                autoDate: formData.autoDate,
                status: formData.autoDate ? "ongoing" : "published",
                voterEmails,
                startDate: newStartDate,
                endDate: newEndDate,
                page: 4,
              })
              .then((res) => {
                if (res.data) {
                }
              });
          } else {
            axios
              .patch(`${import.meta.env.VITE_URL}/election/${formData._id}`, {
                autoDate: formData.autoDate,
                status: formData.autoDate ? "ongoing" : "published",
                voterEmails,
                page: 4,
              })
              .then((res) => {
                if (res.data) {
                }
              });
          }

          Swal.fire(
            "congratulation!",
            "Your Vote has been published.",
            "success"
          );

          navigate("/dashboard/election-correction");
        }
      });
    } else {
      navigate("/dashboard/election-correction");
    }
  };

  return (
    <div className="lg:w-[80%] w-full bg-gray-50 p-3 lg:p-10 rounded-lg">
      <h1 className="text-2xl font-bold pb-3">Confirm and Puplish vote</h1>
      <div className="text-xl space-y-2">
        <p>
          <span className="font-semibold">Election Title:</span> {title}
        </p>
        {autoDate && (
          <p>
            <span className="font-semibold">Election time: </span>After
            pulishing election will end in {autoDate} minutes.
          </p>
        )}
        {startDate && (
          <p>
            <span className="font-semibold">Election Starting time: </span>
            Voting will start on {startDate}
          </p>
        )}
        {endDate && (
          <p>
            <span className="font-semibold">Election Starting time: </span>
            Voting will end on {endDate}
          </p>
        )}
        <div>
          <span className="font-semibold">Ballot(s):</span>
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-gray-200 rounded-md w-full space-y-2 p-4"
            >
              <h2>{q.questionTitle}</h2>
              <p>
                Please choose {q.choosedOptions} {q.voterChoose} for below
                option.
              </p>
              {q.options.map((o, i) => (
                <div key={o}>
                  <p className="py-2 px-3 bg-white">
                    {i + 1}.{o.option}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="pt-5 flex justify-between">
        <button
          onClick={() => dispatch(previous())}
          type="button"
          className="button-pre"
        >
          Back
        </button>
        <button
          onClick={handeConfirmation}
          type="button"
          className="button-next"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
