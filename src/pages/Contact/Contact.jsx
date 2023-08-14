import React from 'react';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ContactHotline from '../../components/ContactHotline/ContactHotline';
import PageBanner from '../../components/PageBanner/PageBanner';
const Contact = () => {
    return (
        <div>
            <PageBanner title={'contact us'} pageRoute={'contact'}></PageBanner>
            <div>
                <div className='my-container'>
                    <h1 className='text-4xl font-extrabold mt-10 px-5 text-slate-700'>Get In Touch With Us</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-10 items-center" >
                        <form className=" p-6">
                            <p className='text-slate-600 mb-2'>Engage with Us: Let's Connect!
                                Questions, ideas, or collaborations? We're here to listen and collaborate. Reach out today and open the door to meaningful interactions. Your input matters!</p>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-slate-600 font-semibold"
                                >
                                    Name:
                                </label>
                                <input type="text" id="name" name="name" placeholder="Your Name"
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
                                    id="comment"
                                    name="comment"
                                    placeholder="write your message"
                                    rows={4}
                                    className="appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-green-200 focus:shadow-outline"
                                    required
                                />
                            </div>
                            <ButtonPrimary>send your message</ButtonPrimary>
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