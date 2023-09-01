import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import PageBanner from "../../components/PageBanner/PageBanner";
import PopularCard from "./PopularCard";
import PrimaryBlog from "./PrimaryBlog";
import RecentCard from "./RecentCard";

function Blog() {
  const [primaryBlog, setPrimaryBlog] = useState({});
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/blogs`);
      return res.data;
    },
  });

  useEffect(() => {
    const prBlog = blogs && blogs.find((p) => p.status === "primary");
    const popuBlogs = blogs && blogs.filter((po) => po.status === "popular");
    const recent = blogs && blogs.filter((re) => re.status === "recent");

    setPrimaryBlog(prBlog);
    setPopularBlogs(popuBlogs);
    setRecentBlogs(recent);
  }, [blogs]);
  console.log(primaryBlog);

  return (
    <div>
      <PageBanner title={"Blog"} pageRoute={"Blog"}></PageBanner>
      <div className="my-container mx-auto px-4">
        <div className="pt-14 xl:px-0 px-4">
          <div className="w-full lg:flex">
            <div className="lg:w-1/2">
              <PrimaryBlog
                key={primaryBlog?._id}
                blog={primaryBlog}
              ></PrimaryBlog>
            </div>
            <div className="lg:w-1/2 lg:ml-8">
              <h2 className="mb-6 text-2xl color-green font-semibold">
                Popular Blogs
              </h2>
              {popularBlogs &&
                popularBlogs.map((blog) => (
                  <PopularCard key={blog._id} blog={blog}></PopularCard>
                ))}
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-2xl color-green text-center font-semibold">
              Recent Blogs
            </h2>
            <div className="grid mb-10 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentBlogs &&
                recentBlogs.map((reBlog) => (
                  <RecentCard key={reBlog._id} blog={reBlog}></RecentCard>
                ))}
            </div>
          </div>
        </div>

        <div />
      </div>
    </div>
  );
}

export default Blog;
