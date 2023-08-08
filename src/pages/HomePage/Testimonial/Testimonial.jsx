import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import TestimonialCard from "../../../components/TestimonialCard/TestimonialCard";


const Testimonial = () => {

const [testimonials, setTestimonials] =useState([]) 
useEffect(() => {
    fetch("/public/TestimonialData.json")
    .then(res => res.json())
    .then(data => setTestimonials(data))
},[])

console.log(testimonials);
  return (
    <div className=" my-container my-20">
      <SectionTitle title={"Testimonial"} subTitle={""}></SectionTitle>
      <div className=" my-conta grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 my-10">
{


      testimonials.map((testimonial) =><TestimonialCard key={testimonial.id} testimonial={testimonial}></TestimonialCard>)}

      </div>
     
    </div>

  );
};

export default Testimonial;
