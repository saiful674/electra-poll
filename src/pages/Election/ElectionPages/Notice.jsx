import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  next,
  previous,
  setEmailInfo,
  setEmailNotice,
  setEmailSubject,
  setUseName,
} from "../../../redux/slices/FormDataSlice";
import { AuthContext } from "../../../Providers/AuthProvider";

const Notice = () => {
  const dispatch = useDispatch();
  const [isdisabled, setDisabled] = useState(false);
  const formData = useSelector((s) => s.formData);
  const noticeData = formData.notice;
  const { status } = formData;
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setDisabled(true);
    if (status === "pending") {
      axios
        .patch(`${import.meta.env.VITE_URL}/election/${formData._id}`, formData)
        .then((res) => {
          if (res.data) {
            setDisabled(false);
            dispatch(next());
          }
        });
    } else {
      setDisabled(false);
      dispatch(next());
    }
  };

  return (
    <div className="lg:w-[80%] w-full bg-gray-50 dark:bg-indigo-950 dark:text-white p-3 rounded-lg lg:p-10">
      <h1 className="text-2xl font-bold pb-3">How the voter will be noticed</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* ----email notice---- */}
        <div className="bg-gray-200 dark:bg-slate-900 p-3 text-lg space-y-3">
          <label className="flex gap-4">
            <input
              type="checkbox"
              disabled={status !== "pending"}
              checked={noticeData.emailNotice}
              className={`transform scale-150`}
              onChange={() => dispatch(setEmailNotice())}
            />
            <p>Email Notice</p>
          </label>
          {noticeData.emailNotice && (
            <label className="flex ps-6 gap-4">
              <input
                type="checkbox"
                disabled={status !== "pending"}
                checked={noticeData.useName}
                className={`transform scale-150`}
                onChange={() => dispatch(setUseName())}
              />
              <p>Use Organization name as Email sender</p>
            </label>
          )}
        </div>

        {/* ---------email templete--------- */}
        {noticeData.emailNotice && (
          <>
            <div className="bg-gray-200 p-3 dark:bg-slate-800">
              <h1 className="text-xl font-bold pb-3">Email Templete</h1>
              <label className="flex gap-3 items-center text-lg bg-white dark:bg-slate-900 p-2 mb-1">
                <p>Subject:</p>
                <input
                  disabled={status !== "pending"}
                  onChange={(e) => dispatch(setEmailSubject(e.target.value))}
                  defaultValue={
                    formData.emailSubject ||
                    "Vote Now: {company name} {election title}"
                  }
                  className="w-full p-1 dark:bg-slate-900"
                  type="text"
                />
              </label>
              <div className="bg-white dark:bg-slate-900 p-3 mb-1">
                <p>
                  You are cordially invited to cast your vote in the upcoming{" "}
                  {formData?.organization} - {formData.title} election.
                </p>
                <br />
                <p>
                  We are employing a sophisticated online voting system to
                  ensure accuracy and transparency. You have been allocated a
                  unique voting key, granting you one-time access to this
                  process. Please treat this key with confidentiality and avoid
                  sharing or forwarding this communication.
                </p>
                <br />
                <p>
                  Should you have any queries or wish to share feedback
                  regarding the election, or if you prefer not to receive
                  subsequent voting notifications, please contact Mr. Mahmud
                  Khan at
                  <a
                    className="text-green-400 underline ps-2"
                    href={user?.email}
                  >
                    {user?.email}
                  </a>
                </p>
              </div>
              <textarea
                disabled={status !== "pending"}
                defaultValue={formData?.emailInfo}
                onChange={(e) => dispatch(setEmailInfo(e.target.value))}
                placeholder="add any other information here"
                className="h-30 p-3 w-full dark:bg-slate-900"
              ></textarea>
              <p className="bg-white p-3 dark:bg-slate-900">Thank you for your participation.</p>
            </div>
          </>
        )}

        <div className="pt-5 flex justify-between">
          <button
            onClick={() => dispatch(previous())}
            type="button"
            className="button-pre"
          >
            Back
          </button>
          <button disabled={isdisabled} type="submit" className="button-next">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Notice;
