import React from "react";
import RecentCard from "../../Blog/RecentCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";

const BlogHome = () => {
  const { data: recentBlog = [], refetch } = useQuery({
    queryKey: ["recentBlog"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/recentBlog`);
      const data = res.data;
      return data;
    },
  });

  return (
    <div className="my-container">
      <SectionTitle
        title={"Our Recent Blogs"}
        subTitle={"To Read Our blogs and know about electro poll"}
      ></SectionTitle>
      <div className="grid mt-20 mb-20 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentBlog &&
          recentBlog
            .slice(0, 3)
            .map((blog) => (
              <RecentCard key={blog?._id} blog={blog}></RecentCard>
            ))}
      </div>
      <div className="flex justify-center mb-5">
        <Link to={"/blog"}>
          <ButtonPrimary>See More Blogs</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default BlogHome;
