import React from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import { toast } from "react-hot-toast";
import { imageUpload } from "../../../../Hooks/ImageUploade";

const PostBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { content } = data
    const splitContent = content.split(/\n+/)
    console.log(splitContent);
    data.status = "recent";
    data.content = splitContent
    data.comments = [];
    imageUpload(data.image[0]).then((imageResponse) => {
      data.image = imageResponse.data.display_url;
      axios
        .post("http://localhost:5000/blog", data)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Blog Post successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    console.log(data);
  };
  return (
    <div>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <form
          className="bg-white min-h-screen w-full shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? "border-red-500" : ""
                }`}
              id="title"
              name="title"
              type="text"
              placeholder="Enter Blog title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">Title is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              className={`shadow appearance-none h-[350px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.content ? "border-red-500" : ""
                }`}
              id="content"
              name="content"
              placeholder="Your Blog content"
              {...register("content", { required: true })}
            />
            {errors.content && (
              <p className="text-red-500 text-xs italic">Content is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? "border-red-500" : ""
                }`}
              id="image"
              name="image"
              type="file"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <p className="text-red-500 text-xs italic">Image is required</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              style={{ backgroundColor: "#00E05A" }}
            >
              Post Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostBlog;
