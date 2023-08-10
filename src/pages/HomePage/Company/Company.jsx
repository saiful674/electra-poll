import React from 'react';
import companyLogo1 from '../../../assets/company/company-logo (1).png';
import companyLogo2 from '../../../assets/company/company-logo (2).png';
import companyLogo3 from '../../../assets/company/company-logo (3).png';
import companyLogo4 from '../../../assets/company/company-logo (4).png';
import companyLogo5 from '../../../assets/company/company-logo (5).png';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Company = () => {
    return (
        <section className='my-container mb-20'>
            <SectionTitle title={'Company Connected With Us'} subTitle={"We've been helping marketers with our campaign platform since 2010.Find out for yourself why we're so popular."} />

            <div className='mt-10 grid grid-cols-2 md:grid-cols-5 gap-5 items-center off-white'>
                <figure data-aos="fade-up" data-aos-duration="1400" data-aos-delay="200" data-aos-once="true">
                    <img src={companyLogo1} alt="our connected companies logo" />
                </figure>
                <figure data-aos="fade-up" data-aos-duration="1400" data-aos-delay="250" data-aos-once="true">
                    <img src={companyLogo2} alt="our connected companies logo" />
                </figure>
                <figure data-aos="fade-up" data-aos-duration="1400" data-aos-delay="300" data-aos-once="true">
                    <img src={companyLogo3} alt="our connected companies logo" />
                </figure>
                <figure data-aos="fade-up" data-aos-duration="1400" data-aos-delay="350" data-aos-once="true">
                    <img src={companyLogo4} alt="our connected companies logo" />
                </figure>
                <figure data-aos="fade-up" data-aos-duration="1400" data-aos-delay="400" data-aos-once="true">
                    <img src={companyLogo5} alt="our connected companies logo" />
                </figure>
            </div>
        </section>
    );
};

export default Company;