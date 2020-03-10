// Dependencies
import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';

// Components
import { Link } from '@components';

// Utils
import randomId from '@utils/randomId';

const MENU = [
  {
    id: randomId(),
    title: 'Home',
    link: '/'
  },
  {
    id: randomId(),
    title: 'About Us',
    link: '#about'
  },
  {
    id: randomId(),
    title: 'How It Works?',
    link: '#how'
  },
  {
    id: randomId(),
    title: 'Contribute',
    link: '#contribute'
  },
  {
    id: randomId(),
    title: 'Login',
    link: '/login'
  },
  {
    id: randomId(),
    title: 'Sign Up',
    link: '/register',
    button: true
  }
];

export default function Navbar() {
  // States
  const [open, setOpen] = useState(false);
  const navbar = useTransition(open, null, {
    from: { transform: `translateY(-${100}%)`, opacity: 0 },
    enter: { transform: `translateY(${0}%)`, opacity: 1 },
    leave: { transform: `translateY(-${100}%)`, opacity: 0 }
  });

  return (
    <>
      <nav className="absolute top-0 z-10 flex flex-wrap items-center justify-between w-full px-2 py-3 text-yellow-700 bg-white lg:text-white lg:bg-transparent">
        <div className="container flex flex-wrap items-center justify-between px-5">
          <div className="relative z-10 flex justify-between w-full bg-white lg:bg-transparent lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="inline-block py-2 mr-4 font-bold leading-relaxed uppercase whitespace-no-wrap"
              href="/"
            >
              Expense Tracker
            </Link>
            <button
              className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setOpen(!open)}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="items-center flex-grow hidden lg:flex">
            <ul className="flex flex-row ml-auto list-none">
              {MENU.map(menuItem =>
                menuItem.button ? (
                  <li key={menuItem.id} className="mx-2 last:mr-0 first:ml-0">
                    <Link
                      className="flex items-center px-3 px-6 py-2 font-semibold leading-snug tracking-wider text-white text-yellow-700 transition-all duration-200 bg-white rounded-md hover:bg-yellow-900 hover:text-white hover:opacity-75"
                      href={menuItem.link}
                    >
                      {menuItem.title}
                    </Link>
                  </li>
                ) : (
                  <li key={menuItem.id} className="mx-2 last:mr-0 first:ml-0">
                    <Link
                      className="flex items-center px-3 py-2 leading-snug tracking-wider text-white hover:opacity-75"
                      href={menuItem.link}
                    >
                      {menuItem.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {navbar.map(
            ({ item, props, key }) =>
              item && (
                <animated.div
                  key={key}
                  style={props}
                  className="absolute top-0 left-0 w-full mt-16 bg-white"
                >
                  <ul className="container flex flex-col px-5 mx-auto list-none lg:flex-row lg:ml-auto">
                    {MENU.map(menuItem =>
                      menuItem.button ? (
                        <li
                          key={menuItem.id}
                          className="flex items-center justify-center my-2"
                        >
                          <Link
                            className="px-3 px-6 py-2 font-semibold leading-snug tracking-wider text-white transition-all duration-200 bg-white bg-yellow-700 rounded-md hover:bg-yellow-900 hover:text-white hover:opacity-75"
                            href={menuItem.link}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      ) : (
                        <li key={menuItem.id} className="my-2">
                          <Link
                            className="flex items-center justify-center px-3 py-2 leading-snug tracking-wider text-yellow-700 hover:opacity-75"
                            href={menuItem.link}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </animated.div>
              )
          )}
        </div>
      </nav>
    </>
  );
}
