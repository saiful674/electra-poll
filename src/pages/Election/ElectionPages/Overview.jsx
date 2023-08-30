import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToInputValue } from "../../../Hooks/convertDate";
import { toUTCDateString } from "../../../Hooks/localToUtc";
import { AuthContext } from "../../../Providers/AuthProvider";
import {
  addFirstPage,
  next,
  setAdminResultAccess,
  setBallotAcces,
  setSelectedTime,
  setVoteType,
  setVoterResultAccess,
} from "../../../redux/slices/FormDataSlice";

const Overview = () => {
  const dispatch = useDispatch();
  const formData = useSelector((s) => s.formData);
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [errors]);

  const [isdisabled, setDisabled] = useState(false);
  const [dateError, setDateError] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(
    formData.timeZone || ""
  );

  const selectedTime = formData.selectedTime;
  const selectedVoteType = formData.voteType;
  const selectedBallotAccess = formData.ballotAccess;
  const adminResultAccess = formData.adminResultAccess;
  const voterResultAccess = formData.voterResultAccess;
  const status = formData.status;

  const onSubmit = (data) => {
    console.log(data);
    setDisabled(true);
    setDateError("");
    if (user) {
      if (status === "pending") {
        let payload = {
          title: data.title,
          autoDate: selectedTime === "option1" ? Math.floor(data.autoDate) : "",
          startDate:
            selectedTime === "option2"
              ? toUTCDateString(data.startDate, selectedTimezone)
              : "",
          endDate:
            selectedTime === "option2"
              ? toUTCDateString(data.endDate, selectedTimezone)
              : "",
          voteType: selectedVoteType,
          ballotAccess: selectedBallotAccess,
          adminResultAccess,
          voterResultAccess,
          adminEmail: data.adminEmail,
          organization: data.organization,
          email: user?.email,
          timeZone: selectedTimezone,
        };
        if (!payload.autoDate) {
          const date1 = new Date(payload.startDate);
          const date2 = new Date(payload.endDate);

          if (date1 > date2) {
            setDateError("end date cannot be before start date");
            window.scrollTo(0, 0);
            return;
          }
        }
        dispatch(addFirstPage(payload));
        axios
          .patch(`http://localhost:5000/election/${formData._id}`, payload)
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              setDisabled(false);
              dispatch(next());
            }
          });
      } else {
        setDisabled(false);
        dispatch(next());
      }
    }
  };

  const timezones = (() => {
    const positiveOffsets = [];
    const negativeOffsets = [];

    moment.tz.names().forEach((name) => {
      const offsetInMinutes = moment.tz(name).utcOffset();
      const hours = Math.floor(Math.abs(offsetInMinutes) / 60);
      const offsetSign = offsetInMinutes < 0 ? "-" : "+";
      const formattedOffset = `UTC${offsetSign}${hours}`;

      if (
        offsetInMinutes >= 0 &&
        positiveOffsets.indexOf(formattedOffset) === -1
      ) {
        positiveOffsets.push(formattedOffset);
      } else if (
        offsetInMinutes < 0 &&
        negativeOffsets.indexOf(formattedOffset) === -1
      ) {
        negativeOffsets.push(formattedOffset);
      }
    });

    positiveOffsets.sort((a, b) => {
      return (
        parseInt(a.replace("UTC", ""), 10) - parseInt(b.replace("UTC", ""), 10)
      );
    });

    negativeOffsets.sort((a, b) => {
      return (
        parseInt(b.replace("UTC", ""), 10) - parseInt(a.replace("UTC", ""), 10)
      );
    });

    return [...positiveOffsets, ...negativeOffsets];
  })();

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
  };

  return (
    <div className="lg:w-[70%] w-full bg-gray-50 p-3 lg:p-10">
      <h1 className="text-2xl font-bold pb-3">Vote Details</h1>
      {/* errors */}
      {(Object.keys(errors).length !== 0 || dateError) && (
        <div className="bg-red-100 border-l-4 min-h-20 flex items-center text-lg border-red-600">
          <ul className="list-decimal ps-6">
            {errors.title && <li>Election Title can't be blank</li>}
            {errors.autoDate?.type === "required" && (
              <li>Please select in how many minutes the elction will end</li>
            )}
            {errors.timeZone?.type === "required" && (
              <li>Please select the time zone</li>
            )}
            {errors.autoDate?.type === "min" && (
              <li>Auto ending time cannot be less than 3 minutes</li>
            )}
            {errors.autoDate?.type === "max" && (
              <li>Auto ending time cannot be more than 60 minutes</li>
            )}
            {errors.startDate && <li>Please add starting date and time</li>}
            {errors.endDate && <li>Please add ending date and time</li>}
            {dateError && <li>end date cannot be before start date</li>}
          </ul>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* -------title------- */}
        <div className="form-control">
          <label className="label">
            <span className="text-lg font-semibold">
              Election Title <span className="text-red-400">&#9998;</span>
            </span>
          </label>
          <input
            disabled={status !== "pending"}
            {...register("title", { required: status === "pending" })}
            placeholder="election title"
            type="text"
            defaultValue={formData.title || ""}
            className="my-input focus:outline-green-400"
          />
        </div>

        {/* -------election date------- */}
        <div className="form-control">
          <label className="pb-1">
            <span className="text-lg font-semibold">
              select election date and time{" "}
              <span className="text-red-400">&#9998;</span>
            </span>
          </label>
          <div>
            <label className="block mb-4 cursor-pointer">
              <input
                disabled={status !== "pending"}
                type="radio"
                value="option1"
                className={`transform scale-150 me-3`}
                checked={selectedTime === "option1"}
                onChange={(e) => dispatch(setSelectedTime(e.target.value))}
              />
              automatically start and end after
              <input
                disabled={selectedTime === "option2"}
                {...register("autoDate", {
                  required: selectedTime === "option1" && status === "pending",
                  min: 3,
                  max: 60,
                })}
                defaultValue={formData.autoDate || 10}
                className="border h-10 px-2 ms-4 w-14"
                type="number"
              ></input>
              minutes
            </label>
            <label>
              <input
                disabled={status !== "pending"}
                type="radio"
                value="option2"
                className="transform scale-150 me-3 mb-3"
                checked={selectedTime === "option2"}
                onChange={(e) => dispatch(setSelectedTime(e.target.value))}
              />
              select starting and ending time
            </label>
          </div>
          {
            <>
              <label className="pb-1">
                <span className="text-md font-semibold">starting time</span>
              </label>
              <input
                disabled={selectedTime === "option1" || status !== "pending"}
                {...register("startDate", {
                  required: selectedTime === "option2" && status === "pending",
                })}
                placeholder="Photo URL"
                type="datetime-local"
                defaultValue={
                  formatDateToInputValue(
                    formData.startDate,
                    formData.timeZone
                  ) || ""
                }
                className="my-input ms-5 focus:outline-green-400"
              />

              <label className="pb-1">
                <span className="text-md font-semibold">ending time</span>
              </label>
              <input
                disabled={selectedTime === "option1" || status !== "pending"}
                {...register("endDate", {
                  required: selectedTime === "option2" && status === "pending",
                })}
                placeholder="Photo URL"
                type="datetime-local"
                defaultValue={
                  formatDateToInputValue(formData.endDate, formData.timeZone) ||
                  ""
                }
                className="my-input ms-5 focus:outline-green-400"
              />
            </>
          }
        </div>

        {/* -----------time zone------------ */}
        <div className="mb-6">
          <label className="label">
            <span className="label-text font-bold">Timezone</span>
          </label>
          <select
            {...register("timeZone", { required: true })}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline focus:out"
            defaultValue={formData.timeZone}
            onChange={(e) => handleTimezoneChange(e.target.value)}
          >
            <option value="">Select a timezone</option>
            {timezones.map((timezone, index) => (
              <option key={index} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>
          <p className="text-sm text-red-500">
            select your timezone carefully. The voting time will be realvent to
            the selected time zone, not their local time.
          </p>
        </div>

        {/* -------organization------ */}
        <div className="form-control">
          <label className="label">
            <span className="text-lg font-semibold">
              Organization<span className="text-red-400">&#9998;</span>
            </span>
          </label>
          <input
            disabled={status !== "pending"}
            {...register("organization", { required: status === "pending" })}
            placeholder="Organization Name"
            type="text"
            defaultValue={"abcd"}
            className="my-input focus:outline-green-400"
          />
        </div>

        {/* ------primary email-------- */}
        <div className="form-control">
          <label className="lebel pb-1">
            <span className="text-lg font-semibold">
              Primary email as orginizar{" "}
              <span className="text-red-400">&#9998;</span>
            </span>
            <p className="text-sm">
              voters can contact this email for any inquery or help
            </p>
          </label>
          <input
            disabled={status !== "pending"}
            {...register("adminEmail", { required: status === "pending" })}
            placeholder="primary email"
            type="text"
            defaultValue={"codeCreafter@gmail.com"}
            className="my-input focus:outline-green-400"
          />
        </div>

        <h1 className="text-2xl font-semibold py-2">Vote Security</h1>

        {/* ---------vote type---------- */}
        <div className="form-control">
          <label className="lebel pb-1">
            <span className="text-lg font-semibold">
              Select vote type<span className="text-red-400">&#9998;</span>
            </span>
          </label>

          <label className="pb-3">
            <input
              disabled={status !== "pending"}
              type="radio"
              value="test"
              className={`transform scale-150 me-3`}
              checked={selectedVoteType === "test"}
              onChange={(e) => dispatch(setVoteType(e.target.value))}
            />
            Test
            <p className="text-sm ps-7">
              try a test election with max 5 voters
            </p>
          </label>
          <label>
            <input
              disabled={status !== "pending"}
              type="radio"
              value="live"
              className="transform scale-150 me-3"
              checked={selectedVoteType === "live"}
              onChange={(e) => dispatch(setVoteType(e.target.value))}
            />
            Live
            <p className="text-sm ps-7">live vote with unlimited voters</p>
          </label>
        </div>

        {/* ----------voter access to ballot-------- */}
        <div className="form-control">
          <label className="lebel pb-1">
            <span className="text-lg font-semibold">
              Voter access to ballot
              <span className="text-red-400">&#9998;</span>
            </span>
          </label>
          <label className="pb-3">
            <input
              disabled={status !== "pending"}
              type="radio"
              value="high"
              className={`transform scale-150 me-3`}
              checked={selectedBallotAccess === "high"}
              onChange={(e) => dispatch(setBallotAcces(e.target.value))}
            />
            High Validation
            <p className="text-sm ps-7">
              electraPoll will create uniqe access key and password for each
              voter.
            </p>
          </label>
          <label className="pb-3">
            <input
              disabled={status !== "pending"}
              type="radio"
              value="medium"
              className={`transform scale-150 me-3`}
              checked={selectedBallotAccess === "medium"}
              onChange={(e) => dispatch(setBallotAcces(e.target.value))}
            />
            Medium Validation
            <p className="text-sm ps-7">
              administrator will manually create uniqe access key and password
              for each voter.
            </p>
          </label>
          <label>
            <input
              disabled={status !== "pending"}
              type="radio"
              value="low"
              className="transform scale-150 me-3"
              checked={selectedBallotAccess === "low"}
              onChange={(e) => dispatch(setBallotAcces(e.target.value))}
            />
            Low Validation
            <p className="text-sm ps-7">
              A common link for every voter. voters can submit multiple ballots.
            </p>
          </label>
        </div>

        {/* -------administrator access to result-------- */}
        <div className="form-control">
          <label className="lebel pb-1">
            <span className="text-lg font-semibold">
              Administrator Access to result
              <span className="text-red-400">&#9998;</span>
            </span>
          </label>

          <label className="pb-3">
            <input
              disabled={status !== "pending"}
              type="radio"
              value="anytime"
              className={`transform scale-150 me-3`}
              checked={adminResultAccess === "anytime"}
              onChange={(e) => dispatch(setAdminResultAccess(e.target.value))}
            />
            Anytime after the vote starts
          </label>
          <label className="pb-3">
            <input
              disabled={status !== "pending"}
              type="radio"
              value="after"
              className={`transform scale-150 me-3`}
              checked={adminResultAccess === "after"}
              onChange={(e) => dispatch(setAdminResultAccess(e.target.value))}
            />
            Only after the vote ends
          </label>
        </div>

        {/* -------Voter access to result-------- */}
        <div className="form-control">
          <label className="lebel pb-1">
            <span className="text-lg font-semibold">
              Voter Access to result
              <span className="text-red-400">&#9998;</span>
            </span>
          </label>

          <label
            className={`pb-3 ${
              adminResultAccess !== "anytime" ? "opacity-50" : "placeholder:"
            }`}
          >
            <input
              type="radio"
              value="anytime"
              className={`transform scale-150 me-3`}
              checked={voterResultAccess === "anytime"}
              disabled={adminResultAccess !== "anytime" || status !== "pending"}
              onChange={(e) => dispatch(setVoterResultAccess(e.target.value))}
            />
            Anytime after the vote starts
          </label>
          <label className="pb-3">
            <input
              type="radio"
              value="after"
              className={`transform scale-150 me-3`}
              disabled={status !== "pending"}
              checked={voterResultAccess === "after"}
              onChange={(e) => dispatch(setVoterResultAccess(e.target.value))}
            />
            Only after the vote ends
          </label>
          <label className="pb-3">
            <input
              disabled={status !== "pending"}
              type="radio"
              value="none"
              className={`transform scale-150 me-3`}
              checked={voterResultAccess === "none"}
              onChange={(e) => dispatch(setVoterResultAccess(e.target.value))}
            />
            Voter has no access to result
          </label>
        </div>

        <div className="pt-5 flex justify-end">
          <button disabled={isdisabled} type="submit" className="button-next">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Overview;
