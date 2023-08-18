import React, { useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { FcSettings } from 'react-icons/fc'
import { MdBallot } from 'react-icons/md'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo-white.png'

const Sidebar = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const user = true;

    const [isActive, setActive] = useState('false')
    const toggleHandler = event => {
        setToggle(event.target.checked)
    }
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-teal-900  flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to={'/'}><img className="h-12 mx-auto" src={logo} alt="logo" /></Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-teal-800'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>
            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-teal-900  w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    {/* Branding & Profile Info */}
                    <div>
                        <div className='w-full hidden md:flex justify-center mx-auto'>
                            <Link to={'/'}><img className="h-12 mx-auto" src={logo} alt="logo" /></Link>
                        </div>

                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6 text-white '>
                        <nav>
                            <>
                                {/* Menu Links */}
                                <NavLink
                                    to='/dashboard/overview'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950  ${isActive ? 'bg-teal-950' : ''
                                        }`
                                    }
                                >
                                    <BsFillHouseAddFill className='w-5 h-5' />

                                    <span className='mx-4 font-medium'>Overview</span>
                                </NavLink>
                                <NavLink
                                    to='/dashboard/election-correction'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950  ${isActive ? 'bg-teal-950 ' : ''
                                        }`
                                    }
                                >
                                    <MdBallot className='w-5 h-5' />

                                    <span className='mx-4 font-medium'>Elections</span>
                                </NavLink>
                                <NavLink
                                    to='/dashboard/voters'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950   ${isActive ? 'bg-teal-950 ' : ''
                                        }`
                                    }
                                >
                                    <FaUsers className='w-5 h-5' />

                                    <span className='mx-4 font-medium'>Voters</span>
                                </NavLink>
                                <NavLink
                                    to='/dashboard/satings'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950   ${isActive ? 'bg-teal-950 ' : ''
                                        }`
                                    }
                                >
                                    <FcSettings className='w-5 h-5' />

                                    <span className='mx-4 font-medium'>Satings</span>
                                </NavLink>

                            </>
                        </nav>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Sidebar
