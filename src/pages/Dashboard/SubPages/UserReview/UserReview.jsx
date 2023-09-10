import React from "react";
import UserName from "../../../../components/Deshboard/UserName/UserName";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ratingImg from "../../../../assets/favicon.png";
import getMyInfo from "../../../../Hooks/getMyInfo";

const UserReview = () => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const { user } = useContext(AuthContext);
  const { myInfo } = getMyInfo();

  /***
    user-name, title, feedback, rating, date
  */

  const handleReview = (event) => {
    event.preventDefault();

    const reviewData = {
      image: user?.photoURL,
      name: user?.displayName,
      title,
      rating,
      feedback,
      organization: myInfo?.organizationName,
    };

    if (rating) {
      axios
        .post(`https://electra-poll-server.vercel.app/user-review`, reviewData)
        .then((response) => {
          if (response.data.insertedId) {
            Swal.fire("Thanks!", "Your feedback means a lot to us!", "success");
            setRating(0);
            event.target.reset();
          }
        })
        .catch((err) => toast.error(err.message));
    } else {
      toast.error("Rating is required....");
    }
  };

  const CustomStar = (
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  );

  const myStyles = {
    itemShapes: CustomStar,
    itemStrokeWidth: 1,
    activeFillColor: "#3ae895",
    activeStrokeColor: "#3ae895",
    inactiveStrokeColor: "#3ae895",
  };

  return (
    <div>
      <UserName />
      {/* <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto my-10 text-center bg-gray-200 rounded-lg"> */}
      <div
        style={{ border: "2px solid #3ae895" }}
        className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto my-10 text-center shadow-md rounded px-8 pt-6 pb-8 border-green-500"
      >
        <img className="w-1/3 mx-auto mb-5" src={ratingImg} alt="" />
        <h3 className="text-2xl font-bold">Rate Our Website</h3>
        <hr className="border-slate-500 h-1 mx-10 my-5" />
        <form
          onSubmit={handleReview}
          className="mx-5 flex flex-col items-center gap-5 pb-10"
        >
          <Rating
            style={{ maxWidth: 180 }}
            value={rating}
            onChange={setRating}
            itemStyles={myStyles}
            isRequired
          />
          <input
            type="text"
            name="title"
            className="p-3 w-5/6 py-3 rounded-md"
            placeholder="your job title (Chairman, Voter, Member etc)"
            onBlur={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            name="feedback"
            className="p-3 w-5/6 h-24 rounded-md"
            placeholder="write your feedback here"
            onBlur={(e) => setFeedback(e.target.value)}
            required
          ></textarea>

          <button>
            <ButtonPrimary children={"Submit"} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserReview;
