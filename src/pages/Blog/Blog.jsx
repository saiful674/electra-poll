import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import PageBanner from "../../components/PageBanner/PageBanner";
import PrimaryBlog from "./PrimaryBlog";
import RcCard from "./RcCard";

function Blog() {
  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(`https://electra-poll-server.vercel.app/blogs`);
      return res.data;
    },
  });


  return (
    <div>
      <PageBanner title={"Blog"} pageRoute={"Blog"}></PageBanner>
      <div className="my-container mx-auto px-4">
        <div className="pt-14 xl:px-0 px-4">
          <div className="w-full lg:flex">
            <div className="lg:w-2/3">
              {blogs &&
                blogs
                  .slice(0, 2)
                  .map((pB) => (
                    <PrimaryBlog key={pB?._id} blog={pB}></PrimaryBlog>
                  ))}
            </div>
            <div className="lg:w-1/3 lg:ml-8">
              <h2 className="mb-6 text-2xl color-green font-semibold">
                Recent Blogs
              </h2>
              {blogs &&
                blogs
                  .slice(2)
                  .map((blog) => <RcCard key={blog._id} blog={blog}></RcCard>)}
            </div>
          </div>
          {/* <div>
            <h2 className="mb-6 text-2xl color-green text-center font-semibold">
              Recent Blogs
            </h2>
            <div className="grid mb-10 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentBlogs &&
                recentBlogs.map((reBlog) => (
                  <RecentCard key={reBlog._id} blog={reBlog}></RecentCard>
                ))}
            </div>
          </div> */}
        </div>

        <div />
      </div>
    </div>
  );
}

export default Blog;
