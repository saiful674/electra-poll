import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ButtonPrimary from '../../../components/ButtonPrimary/ButtonPrimary';
import { useEffect } from 'react';
import Aos from 'aos';
const ContactUs = () => {

  useEffect(() => {
    Aos.init({
      duration: 800
    })
  }, [])


  return (
    <div className="my-container pb-20">
      <SectionTitle
        title={"Contact US"}
        subTitle={"Let's Connect and Communicate"}
      />
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="200"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-5 gap-6 items-center"
      >
        <div data-aos="fade-right" data-aos-duration="800">
        </div>
        <form className="bg-green-50 p-6 shadow-lg rounded-lg">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-slate-600 font-semibold"
            >
              Name:
            </label>
            <input type="text" id="name" name="name" placeholder="name"
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-teal-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-slate-600 font-semibold"
            >
              Email:
            </label>
            <input
              type="email" id="email" name="email"
              placeholder="email"
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-teal-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-slate-600 font-semibold"
            >
              Message:
            </label>
            <textarea
              id="comment"
              name="comment"
              placeholder="write your message"
              rows={4}
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-teal-200"
              required
            />
          </div>
          <ButtonPrimary>send your message</ButtonPrimary>
        </form>
      </div>
    </div>
  )
};

export default ContactUs;
