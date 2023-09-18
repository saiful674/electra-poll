import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import LoadingSpinner from "../shared/LoadingSpinner";
import getMyInfo from "../../Hooks/getMyInfo";
import moment from "moment/moment";
import { FaTrashAlt } from "react-icons/fa";
import { useSpeechSynthesis } from "react-speech-kit";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsFillSignStopFill } from "react-icons/bs";

const SingleBlogs = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { myInfo } = getMyInfo();
  const location = useLocation();
  const navigate = useNavigate();
  const [reply, setReply] = useState(null);
  const [text, setText] = useState("");
  const { speak, cancel, speaking } = useSpeechSynthesis();
  const [deleting, setDeleting] = useState(false);
  const [click, setClick] = useState(false);

  const {
    data: blog = {},
    isLoading,
    refetch: blogRefetch,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/blog/${id}`);
      return res.data;
    },
  });
  useEffect(() => {
    if (blog) {
      const contentText = blog.content ? blog.content.join(" ") : "";
      setText(contentText);
    }
  }, [blog]);
  const handleReply = (commentId) => {
    setReply(commentId);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: comments = [], refetch: commentRefetch } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/comment/${id}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    data.username = user?.displayName;
    data.photo = myInfo?.uploadedImage;
    data.date = new Date();
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
          commentRefetch();
          replayRefetch();
          toast.success("Your comment successfully");
        }
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { data: replyCollection = [], refetch: replayRefetch } = useQuery({
    queryKey: ["reply", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/reply/${id}`);
      return res.data;
    },
  });

  const submitComment = (e, comment) => {
    e.preventDefault();
    const form = e.target;
    const replyData = {
      reply: form.reply.value,
      commentId: reply,
      commentAuthor: comment?.username,
      author: user?.displayName,
      date: new Date(),
      photo: myInfo?.uploadedImage,
      blogId: id,
    };

    axios
      .post(`${import.meta.env.VITE_URL}/reply?id=${id}`, replyData)
      .then((res) => {
        if (res.data.insertedId) {
          replayRefetch();
          toast.success("Your reply successfully");
          setReply(null);
        }
      });
    form.reset();
  };

  const handleDelete = (commId) => {
    if (myInfo?.role === "admin") {
      Swal.fire({
        title: "Are you sure, Want to Delete",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        setDeleting(true);
        axios
          .delete(`${import.meta.env.VITE_URL}/deleteComment/${commId}`)
          .then((res) => {
            if (result.isConfirmed) {
              if (res.data.success) {
                Swal.fire(
                  "Deleted!",
                  "Your Comment has been deleted.",
                  "success"
                );
                setDeleting(false);
                replayRefetch();
                commentRefetch();
              }
            }
          });
      });
    }
  };

  const handleSpeech = async () => {
    try {
      speak({ text: blog?.title + "." + text });
      setClick(true);
    } catch (error) {
      console.log(error);
    }
  };
  const stopSpeech = () => {
    if (speaking) {
      cancel();
    }
    setClick(false);
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  } else {
    return (
      <div className="mt-20">
        <div className="my-container">
          <img
            src={blog?.image}
            className="w-full object-cover max-h-[500px]"
            alt=""
          />
        </div>
        <div className="my-container">
          <div className="flex justify-center mt-6">
            {click ? (
              <button className="text-2xl text-red-400" onClick={stopSpeech}>
                <BsFillSignStopFill></BsFillSignStopFill>
              </button>
            ) : (
              <button
                className="text-2xl flex gap-1 items-center text-green-400"
                onClick={handleSpeech}
              >
                Listen <AiFillPlayCircle></AiFillPlayCircle>
              </button>
            )}
          </div>
          <h2 className="text-3xl font-semibold text-center mt-3 mb-1">
            {blog?.title}
          </h2>
          <div className="my-4">
            {blog.content &&
              blog?.content.map((b, i) => (
                <p key={i} className="text-lg my-4">
                  {b}
                </p>
              ))}
          </div>
          <div className="flex justify-end my-5">
            {comments?.length > 0 && (
              <div className="w-full">
                <h4 className="text-2xl font-semibold">
                  Here you can see all comments
                </h4>

                {comments.map((com, index) => {
                  const getReply = replyCollection.find(
                    (r) => r?.commentId === com?._id
                  );
                  return (
                    <div
                      className="border rounded-md mt-6 my-2 p-2"
                      key={index}
                    >
                      <div className="flex items-center gap-5">
                        <div className="">
                          <img
                            className="w-10  h-10 rounded-full"
                            src={com?.photo}
                            alt={com?.username}
                          />
                        </div>
                        <div className="w-full">
                          <p className=" font-semibold">
                            {com?.username}{" "}
                            <span className="ml-5  text-sm text-gray-500">
                              {moment(com?.date).format("lll")}
                            </span>
                          </p>

                          <div className="">
                            <p className="">{com?.comment}</p>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          {myInfo?.role === "admin" &&
                            (deleting ? (
                              <p>Deleting....</p>
                            ) : (
                              <button
                                onClick={() => handleDelete(com?._id)}
                                className="btn btn-error text-sm btn-sm normal-case"
                              >
                                <FaTrashAlt className="h-3 w-3" />{" "}
                              </button>
                            ))}
                        </div>
                      </div>

                      {getReply && (
                        <div className="ml-10 mt-4 flex gap-5 items-start">
                          <div>
                            <img
                              className="w-10 h-10 rounded-full"
                              src={getReply?.photo}
                              alt={getReply?.author}
                            />
                          </div>
                          <div className="">
                            <p className=" font-semibold">
                              {getReply?.author}{" "}
                              <span className="ml-5 text-sm text-gray-500">
                                {moment(getReply?.date).format("lll")}
                              </span>
                            </p>

                            <p className="">{getReply?.reply}</p>
                          </div>
                        </div>
                      )}

                      {myInfo?.role === "admin" && !getReply && (
                        <button
                          className="text-green-400 ml-10"
                          onClick={() => handleReply(com?._id)}
                        >
                          Reply
                        </button>
                      )}
                      {reply === com?._id && (
                        <div>
                          <form onSubmit={(e) => submitComment(e, com)}>
                            <input
                              className="py-1 px-2 w-full"
                              type="text"
                              name="reply"
                              id="reply"
                              placeholder="type your reply"
                            />
                            <input
                              className="ml-2 border mt-1 py-1 px-1 rounded-sm text-green-400 border-green-400 cursor-pointer"
                              type="submit"
                              value="comment"
                            />
                          </form>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex my-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-2xl font-semibold mb-2"
                  htmlFor="comment"
                >
                  Add your Valuable comment
                </label>
                <textarea
                  className={`shadow appearance-none border rounded lg:w-[50vw] w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.comment ? "border-red-500" : ""
                  }`}
                  id="comment"
                  name="comment"
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
