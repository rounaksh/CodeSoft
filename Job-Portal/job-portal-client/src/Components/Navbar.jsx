import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { RiMenu3Line, RiCloseCircleFill } from "react-icons/ri";
import Dropdown from './Dropdown';

const Navbar = () => {
    const navigate = useNavigate()
    const [loginDetails, setLoginDetails] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleSignOut = () => {
        localStorage.clear()
        setTimeout(navigate('/login', 2000))
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.user ? localStorage.user : false)
        if (data) {
            setLoginDetails(data)
        }
    }, [])

    const navItems = [
        { path: '/', title: 'Start a search' },
        { path: '/salary', title: 'Salary Estimate' },
    ]

    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4 transition-all duration-500'>
            <nav className='flex justify-between items-center py-6'>
                <a href="/" className='flex items-center gap-2 text-2xl text-black'>
                    <svg xmlns='http://www.w3.org/2000/svg' width={29} height={30} viewBox='0 0 29 30' fill='none'>
                        <circle cx={12.0143} cy={12.5143} r={12.0143} fill='#3565e2' fillOpacity={0.4} />
                        <circle cx={16.9857} cy={17.4857} r={12.0143} fill='#3565e2' />
                    </svg>
                    <span>JobPortal</span>
                </a>

                {/* Nav Items for Large Screen */}
                <ul className='hidden md:flex gap-12'>
                    {
                        navItems.map(({ path, title }) => (
                            <li key={path} className='text-base text-primary'>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) => isActive ? 'active' : ''
                                    }
                                >{title}</NavLink>
                            </li>
                        ))
                    }
                    {
                        loginDetails ? (
                            <li key={'/my-job'} className='text-base text-primary'>
                                <NavLink
                                    to={'/my-job'}
                                    className={({ isActive }) => isActive ? 'active' : ''
                                    }
                                >{'My Jobs'}</NavLink>
                            </li>
                        ) : null
                    }
                </ul>

                {/* SignUp & Login Button */}
                {
                    loginDetails ? (
                        <Dropdown loginDetails={loginDetails} handleSignOut={handleSignOut} />
                    ) : (
                        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
                            <Link to={'/login'} className='py-2 px-5 border rounded'>Log in</Link>
                            <Link to={'/sign-up'} className='py-2 px-5 border rounded bg-blue text-white'>Sign up</Link>
                        </div>
                    )
                }

                {/* Small Screen Menu */}
                <div className='md:hidden block'>
                    <button onClick={handleMenuToggler}>
                        {
                            isMenuOpen ? <RiCloseCircleFill className='w-5 h-5 text-primary' /> : <RiMenu3Line className='w-5 h-5 text-primary' />
                        }
                    </button>
                </div>
            </nav >

            {/* Nav Items for Small Screens */}
            < div className={`px-4 bg-gray-700 py-5 rounded-sm transition-all duration-500 ${isMenuOpen ? '' : 'hidden'}`}>
                <ul>
                    {
                        navItems.map(({ path, title }) => (
                            <li key={path} className='text-base text-white first:text-white py-1'>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) => isActive ? `active` : ''
                                    }
                                    onClick={handleMenuToggler}
                                >{title}</NavLink>
                            </li>
                        ))
                    }

                    {
                        !loginDetails ? (
                            <>
                                <hr className='mt-3' />
                                <ul className='flex justify-between'>
                                    <li className='text-white py-1 mt-3'>
                                        <Link to={'/login'} className='py-2 px-5 border rounded bg-blue text-white'>Log in</Link>
                                    </li>
                                    <li className='text-white py-1 mt-3'>
                                        <Link to={'/sign-up'} className='py-2 px-5 border rounded bg-blue text-white'>Sign up</Link>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <ul className='flex flex-col border rounded px-3 mt-3'>
                                <li className='w-full flex justify-between items-center mt-2 px-5'>
                                    <img className="w-8 h-8 rounded-full object-cover" alt="profile" src={loginDetails?.profile} />
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white capitalize">{loginDetails?.userName}</span>
                                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{loginDetails?.email}</span>
                                    </div>
                                </li>
                                <hr className='w-52 mx-auto' />
                                <ul>
                                    <li>
                                        <Link to={'/post-job'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Post A Job</Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                                    </li>
                                </ul>
                            </ul>
                        )
                    }
                </ul>
            </div >
        </header >
    )
}

export default Navbar