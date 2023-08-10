import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import React from "react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div

      className="text-center h-96 flex justify-center items-center mb-5  bg-gray-50 rounded-lg p-5 shadow-lg border-l"
      data-aos="fade-left"
      data-aos-duration="1400"
    >
      <div>
        <h3 className="text-xl font-semibold mb-2">{testimonial.user.name}</h3>
        <p className="text-gray-600">{testimonial.user.occupation}</p>
        <p className="mt-4 text-lg">{testimonial.content}</p>
        <div className="mt-4 mx-auto text-center">
          <Rating
            style={{ maxWidth: 130, margin: "0 auto" }}
            value={testimonial.rating}
            readOnly
          />
        </div>
        <p className="mt-2 text-gray-500">Date: {testimonial.date}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
