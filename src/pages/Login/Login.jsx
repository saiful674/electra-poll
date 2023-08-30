import React from 'react';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { useState } from 'react';
import {  FaRegEyeSlash } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { toast } from 'react-hot-toast';
const Login = () => {
  const { signIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => { 
      console.log(data);

      const { email, password } = data;
      signIn(email, password)
        .then((res) => {
          const loggedUser = res?.user;
          console.log(loggedUser)
          toast.success("Login successfully");
          navigate(from, { replace: true });
        })
        .catch((err) => {
          if (err.code === 'auth/wrong-password') {
            toast.error('Please enter your correct current password.');
          } else {
            toast.error('An error occurred while updating the password.');
          }
        });
    }
  
    return (
        <div className="flex justify-center items-center h-screen">
      <div className="w-full md:w-[440px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ border: "2px solid #3ae895" }}
          className="shadow-md rounded px-8 pt-6 pb-8 border-green-500"
        >
          <h3 className="text-xl font-bold text-center mb-4">Login Now!</h3>

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
              {showPassword ?  <AiOutlineEye /> :<FaRegEyeSlash />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
            <label className="label">
            <Link to='/forget-password' className="label-text-alt link link-hover">Forgot password?</Link>
          </label>
          </div>
          <div className="flex items-center justify-center">
           <button type="submit"> <ButtonPrimary > Login</ButtonPrimary></button>
          </div>
          <p className="mt-2">
            <small>
              New Hear?{" "}
              <Link className="text-[#e2474b]" to="/registration">
                Please Registration
              </Link>
            </small>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
