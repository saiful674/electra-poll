import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import LoadingSpinner from "../shared/LoadingSpinner";

const SingleBlogs = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: blog = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/blog/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.username = user?.displayName;
    if (!user) {
      return Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Please Login for comment",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }

    axios
      .post(`http://localhost:5000/comment/${blog?._id}`, data)
      .then((res) => {
        toast.success("Your comment successfully");
        refetch();
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  else {
    return (
      <div className="mt-16">
        <div
          style={{
            backgroundImage: `url(${blog?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
          className="h-[500px]"
        ></div>
        <div className="my-container">
          <h2 className="text-3xl font-semibold text-center mt-6 mb-1">
            {blog?.title}
          </h2>
          <div className="my-4">
            {blog.content &&
              blog?.content.map((b, i) => <p key={i} className="text-lg mb-1">{b}</p>)}
            {/* <p className="text-lg">{blog?.content}</p> */}
          </div>
          <div className="flex justify-end my-5">
            {blog?.comments?.length > 0 && (
              <div>
                <h4 className="text-2xl font-semibold">
                  Here you can see all comments
                </h4>
                {blog?.comments.map((com, index) => (
                  <div className="border my-2 p-2" key={index}>
                    <p className="font-semibold">{com?.comment}</p>
                    <p>{com?.username}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end my-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-2xl font-semibold mb-2"
                  htmlFor="comment"
                >
                  Add your Valuable comment
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.comment ? "border-red-500" : ""
                    }`}
                  id="comment"
                  name="comment"
                  type="text"
                  placeholder="Enter your comment"
                  {...register("comment", { required: true })}
                />
                {errors.comment && (
                  <p className="text-red-500 text-xs italic">
                    Comment is required
                  </p>
                )}
              </div>
              <input
                type="submit"
                className="btn py-2 bg-green-400 text-white"
                value={"comment"}
              />
            </form>
          </div>
        </div>
      </div>
    );
  };
}

export default SingleBlogs;
