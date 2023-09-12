import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import LoadingSpinner from "../shared/LoadingSpinner";

const SingleBlogs = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [reply, setReply] = useState(null);
  const [replyCollection, setReplyCollection] = useState([]);
  const [comments, setComments] = useState([]);
  const [replyButton, setReplyButton] = useState(true);

  const {
    data: blog = {},
    isLoading,
    refetch: blogRefetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/blog/${id}`);
      return res.data;
    },
  });
  console.log(isError);
  console.log(error);
  const handleReply = (commentId) => {
    setReply(commentId);
  };

  const handleButton = () => {
    setReplyButton(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/comment/${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id]);
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
      .post(`${import.meta.env.VITE_URL}/comment?id=${blog?._id}`, data)
      .then((res) => {
        if (res.data.insertedId) {
          blogRefetch({ force: true });
          toast.success("Your comment successfully");
        }
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/reply/${id}`).then((res) => {
      setReplyCollection(res.data);
    });
  }, [id]);

  const submitComment = (e, comment) => {
    e.preventDefault();
    const form = e.target;
    const replyData = {
      reply: form.reply.value,
      commentId: reply,
      commentAuthor: comment?.username,
      author: user?.displayName,
      blogId: id,
    };

    axios
      .post(`${import.meta.env.VITE_URL}/reply?id=${id}`, replyData)
      .then((res) => {
        if (res.data.insertedId) {
          blogRefetch({ force: true });
          toast.success("Your reply successfully");
        }
      });
    form.reset();
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  } else {
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
              blog?.content.map((b, i) => (
                <p key={i} className="text-lg mb-1">
                  {b}
                </p>
              ))}
            {/* <p className="text-lg">{blog?.content}</p> */}
          </div>
          <div className="flex justify-end my-5">
            {comments?.length > 0 && (
              <div>
                <h4 className="text-2xl font-semibold">
                  Here you can see all comments
                </h4>
                {comments.map((com, index) => (
                  <div className="border my-2 p-2" key={index}>
                    <p className="">
                      {com?.username} ={">"}{" "}
                      <span className="font-semibold">{com?.comment}</span>
                    </p>

                    <p className="ml-10">
                      <span>
                        Author: ={">"}{" "}
                        {
                          replyCollection.find((r) => r?.commentId === com?._id)
                            ?.reply
                        }
                      </span>
                    </p>
                    {replyButton && (
                      <button
                        className="text-green-400"
                        onClick={() => handleReply(com?._id)}
                      >
                        Reply
                      </button>
                    )}
                    {reply === com?._id && (
                      <div>
                        <form onSubmit={(e) => submitComment(e, com)}>
                          <input
                            className="py-1 px-2"
                            type="text"
                            name="reply"
                            id="reply"
                            placeholder="type your reply"
                          />
                          <input
                            onClick={handleButton}
                            className="ml-2 border py-1 px-1 rounded-sm text-green-400 border-green-400 cursor-pointer"
                            type="submit"
                            value="comment"
                          />
                        </form>
                      </div>
                    )}
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
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.comment ? "border-red-500" : ""
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
  }
};

export default SingleBlogs;
