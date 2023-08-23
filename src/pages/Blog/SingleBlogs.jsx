import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const SingleBlogs = () => {
  const { id } = useParams();
  const { data: blog = {}, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/blog/${id}`);
      return res.data;
    },
  });
  console.log(blog);
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
          <p className="text-lg">{blog?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogs;
