import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="mb-10 my-5" data-aos="fade-left" data-aos-duration="800">
      <div className="quote-box w-full">
        <div className="block-quote">
          <div className="quote">
            <p className="flex justify-between items-center mb-7">
              <span className="text-lg font-bold">{testimonial.title}</span>
              <FaQuoteLeft className="text-indigo-500 bg-gray-200 p-2 h-8 w-8 rounded-full" />
            </p>
            <p className="text-base text-gray-700 mb-5 relative">
              {testimonial.feedback.slice(0, 200)}
            </p>
            <Rating
              style={{ maxWidth: 130, position: "absolute", bottom: 30 }}
              value={testimonial.rating}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 mt-8 ml-14">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img
              src={
                testimonial.image ||
                "https://yt3.googleusercontent.com/ytc/AOPolaS1RQLO6XHgaiBWw3yvdodKk87YJ988pdoyN8lo7w=s900-c-k-c0x00ffffff-no-rj"
              }
            />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold uppercase">{testimonial.name}</h4>
          <span>{testimonial.organization || ""}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
