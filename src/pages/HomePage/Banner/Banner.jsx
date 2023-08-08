import bannerImg from '../../../assets/banner-2.png'

const Banner = () => {
    return (
        <div className='my-container h-[85vh] grid gap-10 lg:grid-cols-2 items-center'>
            <div>
                <h1 className='text-4xl font-semibold pb-4'>Your Vote, Your Voice, Our Commitment</h1>
                <p>We are committed to providing a seamless and secure online voting experience. Empower your voice with us.</p>
            </div>
            <div>
                <img src={bannerImg} alt="" />
            </div>
        </div>
    );
};

export default Banner;