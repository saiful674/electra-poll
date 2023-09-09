import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const ForgetPassword = () => {
  const { passwordReset } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      await passwordReset(data.email);
      Swal.fire(
        "Password reset email sent successfully. Check your email and change your password"
      );
      reset();
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center md:pt-28 mb-8">
        <div className="shadow bg-base-100 flex-shrink-0 w-full max-w-sm rounded-2xl">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h3 className="text-xl font-bold text-center mb-4">
                Reset Password
              </h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <p className="text-red-700 label-text-alt mt-2">{error}</p>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn px-3.5 py-2  cursor-pointer border-b-4 border-l-2 active:border-green-600 active:shadow-none shadow-lg bg-gradient-to-tr from-green-500 to-green-400 border-green-600 text-white"
                  value={"Reset Password"}
                />
              </div>
              <div className="mt-2 text-center">
                <Link to="/login" className="link link-hover">
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
