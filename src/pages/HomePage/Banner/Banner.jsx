import bannerImg from '../../../assets/banner-2.png'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';

const Banner = () => {
    return (
        <div className='my-container h-auto lg:h-[85vh] grid gap-10 my-16 lg:my-0 lg:grid-cols-2 items-center'>
            <Swiper
                slidesPerView={1}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop={true}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className='lg:w-full w-[90vw] order-2 lg:order-1 static md:text-center lg:text-start text-center'
            >
                <SwiperSlide className='mb-10'>
                    <h1 className='text-4xl font-semibold pb-4'>Your Vote, Your Voice, Our Commitment</h1>
                    <p>We are committed to providing a seamless and secure online voting experience. Empower your voice with us.</p>
                </SwiperSlide>
                <SwiperSlide>
                    <h1 className='text-4xl font-semibold pb-4'>E-voting Made Easy</h1>
                    <p>Simplify your organization's voting process with our intuitive, secure, and reliable e-voting system. Easy voting is just a click away.</p>
                </SwiperSlide>
                <SwiperSlide className='mb-10'>
                    <h1 className='text-4xl font-semibold pb-4'>Secure. Simple. Swift. Your Digital Ballot Box.</h1>
                    <p>We provide a reliable online voting platform that values your security, appreciates simplicity, and delivers swift results. Welcome to your digital ballot box.</p>
                </SwiperSlide>
            </Swiper>
            <div className='order-1 lg:order-2'>
                <img className='w-full h-full' src={bannerImg} alt="" />
            </div>
        </div>
    );
};

export default Banner;