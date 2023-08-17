import React, { useContext } from 'react';
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { FaRegEyeSlash } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { useState } from 'react';
import { AuthContext } from "../../Providers/AuthProvider";

const Registration = () => {
  const { createUser, user, signInGoogle } = useContext(AuthContext);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();


    const onSubmit = data => { 

         const { email,photoURL:imgurl, username:name, password } = data;
         console.log(data);
    createUser(email, password, name, imgurl).then(() => {
      const savedUser = {
        name: name,
        email: email,
        role: "student",
        imgurl: imgurl,
      };
      // fetch("/users", {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(savedUser),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.insertedId) {
      //       toast.success(`Hello! ${email}! WelCome`);
      //       navigate("/");
      //     } else {
      //       toast.error("Already User");
      //     }
      //   });
    });
  
    }
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <div className="flex justify-center items-center h-screen">
      <div className="w-full md:w-[440px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ border: "2px solid #3ae895" }}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
          >
            <h3 className='text-xl font-bold text-center mb-4'>Registration Now!</h3>
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
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 20,
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
          <div className="mb-6 relative">
            <input
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === watch('password'),
              })}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline focus:out"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaRegEyeSlash /> : <AiOutlineEye />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">Passwords must match</p>
            )}
          </div>
          <div className="mb-6">
            <input
              {...register("photoURL", { required: true })}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200  focus:shadow-outline focus:out"
              type="url"
              placeholder="Photo URL"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">photoURL is required</p>
            )}
          </div>
          <div className="flex items-center justify-between">
        
           <button type='submit'> <ButtonPrimary type="submit"> Registration</ButtonPrimary></button>
          </div>
          <p className='mt-2'><small>Already have an account? <Link className='text-[#e2474b]' to='/login'>please login</Link></small></p>
        </form>
       
      </div>
    </div>
  );
};

export default Registration;