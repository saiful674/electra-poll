import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiBars3BottomRight, HiXMark } from 'react-icons/hi2';


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-white">
            <div className="lg:flex hidden my-container justify-between py-1">
                <img className="h-16" src="/logo.png" alt="" />
                <div className="flex justify-between items-center gap-5 text-lg">
                    <NavLink className={({ isActive }) => isActive ? 'color-green' : ''} to='/'>Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'color-green' : ''} to='/about'>About</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'color-green' : ''} to='/services'>Services</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'color-green' : ''} to='/contact'>Contact</NavLink>
                </div>
            </div>


            {/* ================ mobile view================ */}
            <div className="lg:hidden flex justify-between my-container py-1 relative">
                <img className="h-11" src="/logo.png" alt="" />
                <button onClick={() => setIsOpen(true)}>
                    <HiBars3BottomRight className="text-2xl"></HiBars3BottomRight>
                </button>
                {
                    isOpen && <ul className="absolute py-3 gap-2 rounded-md bg-green-400 flex flex-col right-0 top-2 w-1/2 items-center">
                        <button className="absolute right-2" onClick={() => setIsOpen(false)}>
                            <HiXMark className="text-xl"></HiXMark>
                        </button>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'color-green' : ''} to='/'>Home</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'color-green' : ''} to='/about'>About</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'color-green' : ''} to='/services'>Services</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'color-green' : ''} to='/contact'>Contact</NavLink>
                    </ul>
                }
            </div>
        </div>
    );
};

export default Navbar;