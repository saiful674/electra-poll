import { useEffect } from "react";
import { useState } from "react";
import { HiBars3BottomRight, HiXMark } from 'react-icons/hi2';
import { NavLink } from "react-router-dom";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [visible, setVisible] = useState(true);
    const [zeroScroll, setZeroScroll] = useState(true)

    useEffect
        (() => {
            const handleScroll = () => {
                const currentScrollPos = window.scrollY;
                const isVisible = prevScrollPos > currentScrollPos;

                setPrevScrollPos(currentScrollPos);
                setVisible(isVisible);
            };

            if (window.scrollY <= 0) {
                setZeroScroll(true)
            }
            else {
                setZeroScroll(false)
            }

            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, [prevScrollPos]);

    return (
        <div data-aos="fade-down" data className={`${visible ? '' : 'hidden'} ${!zeroScroll ? 'bg-white shadow-lg' : 'bg-green-50'} fixed w-screen z-10 top-0`}>
            <div className="hidden lg:flex my-container justify-between py-2">
                <img className="h-12" src="/logo.png" alt="" />
                <div className="flex justify-between items-center gap-5 text-lg">
                    <NavLink className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/'>Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/about '>About</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/services'>Services</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/contact'>Contact</NavLink>
                </div >
                <div className="flex justify-between items-center gap-5 text-lg">
                    <NavLink className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/contact'>Login</NavLink>
                    <button className="my-btn-sec">
                        Register
                    </button>
                </div>
            </div >


            {/* ================ mobile view================ */}
            < div className="lg:hidden flex justify-between my-container py-1 relative" >
                <img className="h-11" src="/logo.png" alt="" />
                <button onClick={() => setIsOpen(true)}>
                    <HiBars3BottomRight className="text-2xl"></HiBars3BottomRight>
                </button>
                {
                    isOpen && <ul className="absolute py-3 gap-2 rounded-md bg-white flex flex-col right-0 top-2 w-1/2 items-center">
                        <button className="absolute right-2" onClick={() => setIsOpen(false)}>
                            <HiXMark className="text-xl"></HiXMark>
                        </button>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/'>Home</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/about'>About</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/services'>Services</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/contact'>Contact</NavLink>
                    </ul>
                }
            </ div>
        </div >
    );
};

export default Navbar;