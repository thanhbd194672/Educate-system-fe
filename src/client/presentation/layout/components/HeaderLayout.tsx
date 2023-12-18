import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'

import {Outlet, useNavigate} from "react-router";
import {useSessionContext} from "@/client/presentation/contexts/SessionContext";
import {WebConfig} from "@/client/config/WebConfig";

const navigation = [
    {name: 'HOME', href: '/', current: true},
    {name: 'ABOUT', href: '/', current: false},
    {name: 'COURSE', href: '/', current: false},
    {name: 'LOGIN', href: '/', current: false},
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function HeaderLayout() {
    const navigate = useNavigate()
    const [session, setSession] = useSessionContext()
    const webConfig = WebConfig.getInstance()

    const onLogout = () => {
        localStorage.removeItem('user')
        //set token
        webConfig.token = undefined

        //set lại trạng
        setSession({
            isAuthenticated: false,
            redirectPath: '/',
            user: undefined
        })
        navigate(session.redirectPath)
        console.log('logout')
    }

    return (
        <>
            <Disclosure as="nav" className="bg-white">
                {({open}) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button
                                        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5"/>
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div
                                    className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="h-14 w-auto"
                                            src="@/../img/logo.png"
                                            alt="Logo"
                                        />
                                    </div>

                                </div>
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <div className="hidden sm:mr-6 sm:block ">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current ? 'bg-sky-200 text-green-900 '  : 'text-stone-950 hover:bg-sky-200 hover:text-green-900',
                                                        'rounded-md px-3 py-2 text-sm font-bold'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="border-none relative rounded-full bg-white p-1 text-stone-950 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6 fill-amber-300" aria-hidden="true" />
                                    </button>
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button
                                                className="border-none relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-0">
                                                <span className="absolute-inset-1.5"/>
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src="@/../img/student.png"
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Button
                                                    className={ 'border-none bg-white  block px-4 py-2 text-sm text-gray-700'}
                                                    onClick={onLogout}>
                                                    Sign out

                                                </Menu.Button>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <Outlet></Outlet>
        </>
    )
}