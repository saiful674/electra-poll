import contact from '../../../assets/faq-lottie/contact2.json'
import Lottie from "lottie-react";
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ButtonPrimary from '../../../components/ButtonPrimary/ButtonPrimary';
const ContactUs = () => {


  return (
    <div className="my-container ">
       <SectionTitle title={"Contact US"}
             subTitle={"Let's Connect and Communicate"}
            />
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-5  gap-6 items-center">
    
    <form  className="bg-teal-50 p-6 shadow-lg rounded-lg">
  <div className="mb-4">
    <label htmlFor="name" className="block text-slate-600 font-semibold">
      Name:
    </label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder='name'
      className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-teal-200"
      required
    />
  </div>
  <div className="mb-4">
    <label htmlFor="email" className="block  text-slate-600  font-semibold">
      Email:
    </label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder='email'
      className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-teal-200"
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="comment" className="block  text-slate-600 font-semibold">
    Massage:
    </label>
    <textarea
      id="comment"
      name="comment"
      placeholder='write your massage'
      rows={4}
      className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-teal-200"
      required
    />
  </div>
<ButtonPrimary>send your massage</ButtonPrimary>
</form>
<div>
    <Lottie className='w-[85%] mx-auto order-2' animationData={contact} loop={true} />
    </div>
 </div>
    </div>

  ) };

export default ContactUs;
