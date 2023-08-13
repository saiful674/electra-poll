// import contact from '../../../assets/faq-lottie/contact2.json'
// import Lottie from "lottie-react";
// import SectionTitle from '../../../components/SectionTitle/SectionTitle';
// import ButtonPrimary from '../../../components/ButtonPrimary/ButtonPrimary';
// import { useEffect } from 'react';
// import Aos from 'aos';
// const ContactUs = () => {

//   useEffect(() => {
//     Aos.init({
//       duration: 800
//     })
//   }, [])

//   return (
//     <div className="my-container ">
//       <SectionTitle title={"Contact US"}
//         subTitle={"Let's Connect and Communicate"}
//       />
//       <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-5  gap-6 items-center">
//         <div data-aos="fade-right" data-aos-duration="800">
//           <Lottie autoplay={false} renderer="svg" className='w-[85%] mx-auto order-2' animationData={contact} loop={true} />
//         </div>
       

//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block  text-slate-600  font-semibold">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder='email'
//               className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-teal-200"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="comment" className="block  text-slate-600 font-semibold">
//               Massage:
//             </label>
//             <textarea
//               id="comment"
//               name="comment"
//               placeholder='write your massage'
//               rows={4}
//               className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-teal-200"
//               required
//             />
//           </div>
//           <ButtonPrimary>send your massage</ButtonPrimary>
//         </form>
//       </div>
//     </div>

//   )
// };

// export default ContactUs;
