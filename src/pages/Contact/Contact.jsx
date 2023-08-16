import React, { useState } from 'react';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import emailjs from 'emailjs-com';
import 'leaflet/dist/leaflet.css';
import ContactHotline from '../../components/ContactHotline/ContactHotline';
import PageBanner from '../../components/PageBanner/PageBanner';
import Swal from 'sweetalert2';
const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a template ID on EmailJS
        const templateId = 'template_zinnd5k';

        // Replace these values with your own
        const userId = 'chiIWomWwO-YuAYId';
        const serviceId = 'service_z9b5cc3';

        // Set the parameters for the email template
        const templateParams = {
            from_name: name,
            from_email: email,
            to_name: 'Your Name',
            message: message,
        };

        // Send the email using EmailJS
        emailjs.send(serviceId, templateId, templateParams, userId)
            .then((response) => {
                console.log('Email sent!', response.status, response.text);
                // Reset the form
                setName('');
                setEmail('');
                setMessage('');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your message has been sent successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };
    return (
        <div>
            <PageBanner title={'contact us'} pageRoute={'contact'}></PageBanner>
            <div>
                <div className='my-container'>
                    <h1 className='text-4xl font-extrabold mt-10 px-5 text-slate-700'>Get In Touch With Us</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-10 items-center" >
                        <form onSubmit={handleSubmit} className=" p-6">
                            <p className='text-slate-600 mb-2'>Engage with Us: Let's Connect!
                                Questions, ideas, or collaborations? We're here to listen and collaborate. Reach out today and open the door to meaningful interactions. Your input matters!</p>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-slate-600 font-semibold"
                                >
                                    Name:
                                </label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" placeholder="Your Name"
                                    className="appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email" id="email" name="email"
                                    placeholder="email"
                                    className="appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="comment"
                                    className="block text-slate-600 font-semibold "
                                >
                                    Message:
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    id="message"
                                    name="message"
                                    placeholder="write your message"
                                    rows={4}
                                    className="appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
                                    required
                                />
                            </div>
                            <button type="submit" className=" rounded relative inline-flex group items-center justify-center px-3.5 py-2  cursor-pointer border-b-4 border-l-2 active:border-green-600 active:shadow-none shadow-lg bg-gradient-to-tr from-green-500 to-green-400 border-green-600 text-white">
                                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-hover:w-32 group-hover:h-11 opacity-10"></span>
                                <span className="relative font-bold">send your message</span>
                            </button>
                        </form>
                        <div className='z-10'>
                            <MapContainer
                                center={[23.746466, 90.415192]}
                                zoom={15}
                                style={{ height: '400px', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                                    OpenStreetMap</a> contributors'
                                />
                                <Marker position={[23.746466, 90.415192]} />
                            </MapContainer>
                        </div>
                    </div>

                </div>
                <ContactHotline></ContactHotline>
            </div>
        </div>
    );
};

export default Contact;