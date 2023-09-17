import React from "react";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";

const PrimaryBlog = ({ blog }) => {
  return (
    <div className="mb-8">
      <img src={blog?.image} className="max-h-[400px] object-cover w-full" />
      <div className="mt-8 lg:mb-0 mb-8">
        <h1 className="f-m-m text-2xl font-semibold leading-7">
          {blog?.title}
        </h1>
        <p className="text-base f-m-m leading-loose mt-2">
          {blog?.content && blog?.content[0]?.slice(0, 150)}
        </p>
        <div className="mt-6">
          <Link to={`/singleBlog/${blog?._id}`}>
            <ButtonPrimary>Red more</ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrimaryBlog;
