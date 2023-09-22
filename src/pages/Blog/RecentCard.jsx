import React from "react";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RecentCard = ({ blog }) => {
  const {t}=useTranslation(["home","common"])

  return (
    <div className="max-w-sm h-[530px] flex justify-between flex-col rounded overflow-hidden shadow-lg dark:shadow-slate-500">
      <img
        className="w-full h-[250px] object-fill"
        src={blog?.image}
        alt="Mountain"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{blog?.title}</div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {blog?.content[0].slice(0, 150)}
        </p>
      </div>

      <div className="text-right px-3 py-2 mb-3">
        <Link to={`/singleBlog/${blog?._id}`}>
<<<<<<< HEAD
        <ButtonPrimary>{t("common:ReadMore")}</ButtonPrimary>
=======
          <ButtonPrimary>Read more</ButtonPrimary>
>>>>>>> 84e0b9f28f354f890fa22ccf117845d319cd3205
        </Link>
      </div>
    </div>
  );
};

export default RecentCard;
