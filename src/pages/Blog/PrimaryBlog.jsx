import React from "react";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";

const PrimaryBlog = ({ blog }) => {
  return (
    <div>
      <img src={blog?.image} className="h-[450px] w-full" />
      <div className="mt-8 lg:mb-0 mb-8">
        <h1 className="f-m-m text-2xl font-semibold leading-7">
          {blog?.title}
        </h1>
        <p className="text-base f-m-m leading-loose mt-2">
          {blog?.content?.slice(0, 200)}
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
