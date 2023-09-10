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
import ratingImg from "../../../../assets/rating.png";
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
        .post(`http://localhost:5000/user-review`, reviewData)
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

  return (
    <div>
      <UserName />
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto my-10 text-center bg-gray-200 rounded-lg">
        <img className="w-1/2 mx-auto" src={ratingImg} alt="" />
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
