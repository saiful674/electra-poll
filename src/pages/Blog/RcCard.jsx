import React from "react";

import { Link } from "react-router-dom";

const RcCard = ({ blog }) => {
  return (
    <div className="lg:flex items-start mb-8">
      <img
        src={blog?.image}
        className="w-full rounded-sm md:h-[160px] md:w-[160px]"
      />
      <div className="lg:ml-6">
        <h1 className="f-m-m text-xl font-semibold leading-7 lg:mt-0 mt-8">
          {blog?.title}
          <span className="text-green-400 ml-4 ">
            <Link to={`/singleBlog/${blog?._id}`}>Read More</Link>
          </span>
        </h1>
        {/* <p className="text-base f-m-m leading-loose mt-2">
          {blog.content && blog?.content[0].slice(0, 150)}....
        </p> */}
      </div>
    </div>
  );
};

export default RcCard;
