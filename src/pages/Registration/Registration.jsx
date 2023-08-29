import moment from "moment-timezone";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { imageUpload } from "../../Hooks/ImageUploade";
import { AuthContext } from "../../Providers/AuthProvider";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";

const Registration = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [selectedTimeFormat, setSelectedTimeFormat] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const timezones = moment.tz.names();

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
    const utcOffset = getUtcOffset(timezone);
    setSelectedTimeFormat(utcOffset);
  };

  const getUtcOffset = (timezone) => {
    const offsetMinutes = moment.tz(timezone).utcOffset();
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetMinutesPart = Math.abs(offsetMinutes % 60);
    const offsetSign = offsetMinutes < 0 ? "-" : "+";

    return `UTC${offsetSign}${offsetHours}`;
  };

  const onSubmit = async (data) => {
    const {
      username,
      email,
      password,
      file,
      organizationName,
      membershipSize,
    } = data;

    try {
      const result = await createUser(email, password);
      const loggedUser = result;
      console.log(loggedUser);

      const uploadedImage = await imageUpload(file[0]);
      await updateUserProfile(username, uploadedImage.data.display_url);
      const savedUser = {
        name: username,
        email: email,
        uploadedImage: uploadedImage.data.display_url,
        organizationName,
        membershipSize,
        timezone: `${selectedTimezone} ${getUtcOffset(selectedTimezone)}`,
        timeFormat: selectedTimeFormat,
      };
      console.log(savedUser);
      const response = await fetch(
        "https://electra-poll-server.vercel.app/users",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(savedUser),
        }
      );

      const responseData = await response.json();

      if (responseData.insertedId) {
        toast.success(`Hello! ${email}! Welcome`);
        reset();
        navigate("/");
      } else {
        toast.error("Already User");
      }
    } catch (error) {
      console.log(error);
      // Handle error here
    }
  };

  return (
    <div className="flex justify-center items-center  ">
      <div className="w-full md:w-[440px] mt-20 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ border: "2px solid #3ae895" }}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        >
          <h3 className="text-xl font-bold text-center mb-4">
            Registration Now!
          </h3>
          <div className="mb-4">
            <input
              {...register("username", { required: true })}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">Username is required</p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("email", { required: true })}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
              type="email"
              placeholder="email"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">Email is required</p>
            )}
          </div>
          <div className="mb-6 relative">
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> : <FaRegEyeSlash />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
          </div>
          <div className="mb-6 relative">
            <input
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline focus:out"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEye /> : <FaRegEyeSlash />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">Passwords must match</p>
            )}
          </div>
          <div className="mb-6">
            <input
              style={{ display: "none" }}
              {...register("file", { required: true })}
              name="file"
              type="file"
              id="file"
            />
            <label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="file"
            >
              <FcAddImage className="text-5xl" />
              <span className="opacity-50">Add your image</span>
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">Image is required</p>
            )}
          </div>
          <label className="label">
            <span className="label-text font-bold">Organization Details</span>
          </label>
          <div className="mb-6">
            <input
              {...register("organizationName", { required: true })}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out"
              type="text"
              placeholder="Organization Name"
              name="organizationName"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                Organization Name is required
              </p>
            )}
          </div>
          <div className="mb-6">
            <input
              {...register("membershipSize", { required: true })}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out"
              type="number"
              name="membershipSize"
              placeholder="Membership Size"
            />
            {errors.membershipSize && (
              <p className="text-red-500 text-xs mt-1">
                Membership Size is required
              </p>
            )}
          </div>
          {/* {time format} */}

          <div className="mb-6">
            <label className="label">
              <span className="label-text font-bold">Timezone</span>
            </label>
            <select
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline focus:out"
              onChange={(e) => handleTimezoneChange(e.target.value)}
              value={selectedTimezone}
            >
              <option value="">Select a timezone</option>
              {timezones.map((timezone, index) => (
                <option key={index} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
            {selectedTimeFormat && (
              <p>Your preferred time format: {selectedTimeFormat}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
              />

              <span className="ml-2">
                I agree to the{" "}
                <Link to="/termsAndCondition" className="link link-success ">
                  Terms of Service
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">
                You must agree to the Terms of Service
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button type="submit">
              {" "}
              <ButtonPrimary type="submit"> Registration</ButtonPrimary>
            </button>
          </div>
          <p className="mt-2">
            <small>
              Already have an account?{" "}
              <Link className="text-[#e2474b]" to="/login">
                please login
              </Link>
            </small>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
