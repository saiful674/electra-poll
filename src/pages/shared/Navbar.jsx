import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiBars3BottomRight, HiXMark } from 'react-icons/hi2';


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-white">
            <div className="lg:flex hidden my-container justify-between py-1">
                <img className="h-12" src="/logo.png" alt="" />
                <div className="flex justify-between items-center gap-5 text-lg">
                    <NavLink className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/'>Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/about'>About</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/services'>Services</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/contact'>Contact</NavLink>
                </div>
                <div className="flex justify-between items-center gap-5 text-lg">
                    <NavLink className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/contact'>Login</NavLink>
                    <button className="my-btn-pri">
                        Register
                    </button>
                </div>
            </div>


            {/* ================ mobile view================ */}
            <div className="lg:hidden flex justify-between my-container py-1 relative">
                <img className="h-11" src="/logo.png" alt="" />
                <button onClick={() => setIsOpen(true)}>
                    <HiBars3BottomRight className="text-2xl"></HiBars3BottomRight>
                </button>
                {
                    isOpen && <ul className="absolute py-3 gap-2 rounded-md bg-green-50 flex flex-col right-0 top-2 w-1/2 items-center">
                        <button className="absolute right-2" onClick={() => setIsOpen(false)}>
                            <HiXMark className="text-xl"></HiXMark>
                        </button>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/'>Home</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/about'>About</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/services'>Services</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-400' : ''} to='/contact'>Contact</NavLink>
                    </ul>
                }
            </div>
        </div>
    );
};

export default Navbar;