import Aos from "aos";
import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import faqImage from '../../../assets/faq/faq.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './Faq.css';
import { useTranslation } from "react-i18next";

const Faq = () => {
    const {t}=useTranslation(["home","common"])


    useEffect(() => {
        Aos.init({
            duration: 800
        })
    }, [])

    const [faqs, setFaqs] = useState([
        {
            id: 1,
            question: `${t("home:faqs-question1")}`,
            answer: `${t("home:faqs-answer1")}`,

        },
        {
            id: 2,
            question: `${t("home:faqs-question2")}`,
            answer: `${t("home:faqs-answer2")}`,

        },
        {
            id: 3,
            question: `${t("home:faqs-question3")}`,
            answer: `${t("home:faqs-answer3")}`,

        },
        {
            id: 4,
            question: `${t("home:faqs-question4")}`,
            answer: `${t("home:faqs-answer4")}`,

        },
        {
            id: 5,
            question: `${t("home:faqs-question5")}`,
            answer: `${t("home:faqs-answer5")}`,

        },
        {
            id: 6,
            question: `${t("home:faqs-question6")}`,
            answer: `${t("home:faqs-answer6")}`,

        },
       
    ]);


    return (
        <div data-aos="fade-up" className='my-container'>
<<<<<<< HEAD
             <SectionTitle
        title={`${t("home:faqs-title")}`}
        subTitle={`${t("home:faqs-subTitle")}`}
      ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-10  gap-6 items-center'>
=======
            <SectionTitle title={"Frequently Asked Questions"}
                subTitle={"Your Questions, Our Answers"}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-10 gap-6 items-center dark:text-gray-300'>
>>>>>>> 84e0b9f28f354f890fa22ccf117845d319cd3205
                <Accordion className="order-2" allowZeroExpanded>
                    {faqs.map((item) => (
                        <AccordionItem key={item.id}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {item.question}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                {item.answer}
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div data-aos="fade-right" data-aos-duration="800" className=' md:ps-20 order-1'>
                    <img src={faqImage} alt="faq image" />
                </div>
            </div>



        </div>
    );
};

export default Faq;
