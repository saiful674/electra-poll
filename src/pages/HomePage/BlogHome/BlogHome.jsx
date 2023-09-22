import React from "react";
import RecentCard from "../../Blog/RecentCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogHome = () => {
  const {t}=useTranslation(["home","common"])

  const { data: recentBlog = [], refetch } = useQuery({
    queryKey: ["recentBlog"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/recentBlog`);
      const data = res.data;
      return data;
    },
  });

  return (
    <div className="my-container dark:text-white">
      <SectionTitle
        title={`${t("home:recentBlogs-title")}`}
        subTitle={`${t("home:recentBlogs-subTitle")}`}
      ></SectionTitle>
      <div className="grid mt-20 mb-20 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentBlog &&
          recentBlog
            ?.slice(0, 3)
            .map((blog) => (
              <RecentCard key={blog?._id} blog={blog}></RecentCard>
            ))}
      </div>
      <div className="flex justify-center mb-10">
        <Link to={"/blog"}>
          <ButtonPrimary>{t("common:SeeMoreBlogs")}</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default BlogHome;
