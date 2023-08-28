import React from "react";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";

const RecentCard = ({ blog }) => {
  return (
    <div className="max-w-sm h-[530px] flex justify-between flex-col rounded overflow-hidden shadow-lg">
      <img className="w-full h-[250px]" src={blog?.image} alt="Mountain" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{blog?.title}</div>
        <p className="text-gray-700 text-base">{blog?.content.slice(0, 150)}</p>
      </div>

      <div className="text-right  px-3 py-2">
        <Link to={`/singleBlog/${blog?._id}`}>
          <ButtonPrimary>Red more</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default RecentCard;
