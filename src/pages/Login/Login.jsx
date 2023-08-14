import React from 'react';
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaRegEyeSlash } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
const Login = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const onSubmit = data => {

    console.log(data)
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex justify-center items-center lg:h-screen md:h-[65vh] h-[65vh] my-container lg:w-[40%] md:w-[50%] mt-16">
      <div className="w-full bg-green-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ border: "2px solid #3ae895" }}
          className="shadow-md rounded px-8 pt-6 pb-8 border-green-500"
        >
          <h3 className='text-xl font-bold text-center mb-4'>Login Now!</h3>

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
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[@$!%*#?&])(?=.*[A-Z])/,
              })}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <AiOutlineEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <ButtonPrimary type="submit"> Login</ButtonPrimary>
          </div>
          <p className='mt-2'><small>New Hear? <Link className='text-[#e2474b]' to='/registration'>Please Registration</Link></small></p>
        </form>

      </div>
    </div>
  );
};

export default Login;