import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'

const Dropdown = ({ loginDetails, handleSignOut }) => {

    return (
        <Menu>
            <div className="hidden items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:flex">
                <Menu.Button className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-collapse-toggle='user-dropdown' data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span className="sr-only cursor-pointer">Open user menu</span>
                    <img className="w-8 h-8 rounded-full object-cover" alt="profile" src={loginDetails?.profile} />
                </Menu.Button>

                {/* <!-- Dropdown menu --> */}
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className={`absolute lg:right-24 lg:top-11 md:right-4 md:top-11 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                        <Menu.Item as='div' className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white capitalize">{loginDetails?.userName}</span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{loginDetails?.email}</span>
                        </Menu.Item>
                        <Menu.Item as='ul' className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link to={'/post-job'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Post A Job</Link>
                            </li>
                            <li>
                                <Link onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                            </li>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
    )
}

export default Dropdown