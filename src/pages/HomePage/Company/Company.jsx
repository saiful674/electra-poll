import React from 'react';
import companyLogo1 from '../../../assets/company/company-logo (1).png';
import companyLogo2 from '../../../assets/company/company-logo (2).png';
import companyLogo3 from '../../../assets/company/company-logo (3).png';
import companyLogo4 from '../../../assets/company/company-logo (4).png';
import companyLogo5 from '../../../assets/company/company-logo (5).png';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useEffect } from 'react';
import Aos from 'aos';
import { useTranslation } from 'react-i18next';
const Company = () => {
    const {t}=useTranslation(["home","common"])


    useEffect(() => {
        Aos.init({
            duration: 800
        })
    }, [])

    return (
        <section data-aos="fade-up" className='my-container mb-20'>
             <SectionTitle
        title={`${t("home:connectedWithUs-title")}`}
        subTitle={`${t("home:connectedWithUs-description")}`}
      ></SectionTitle>
          
            <div className='mt-10 grid grid-cols-2 md:grid-cols-5 gap-5 items-center off-white'>
    
      <figure>
                    <img src={companyLogo1} alt="our connected companies logo" />
                </figure>
                <figure>
                    <img src={companyLogo2} alt="our connected companies logo" />
                </figure>
                <figure>
                    <img src={companyLogo3} alt="our connected companies logo" />
                </figure>
                <figure>
                    <img src={companyLogo4} alt="our connected companies logo" />
                </figure>
                <figure>
                    <img src={companyLogo5} alt="our connected companies logo" />
                </figure>
   
            </div>
          
        </section>
    );
};

export default Company;