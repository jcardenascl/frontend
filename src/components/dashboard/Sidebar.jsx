// Dependencies
import React, { useState } from 'react';

// Components
import Link from '@components';

export default function Sidebar() {
  // States
  const [collapseShow, setCollapseShow] = useState('hidden');

  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden md:w-64">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap">
          {/* Toggler */}
          <button
            className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars" />
          </button>
          {/* Brand */}
          <Link
            className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-gray-700 uppercase whitespace-no-wrap md:block md:pb-2"
            to="/"
          >
            Tailwind Starter Kit
          </Link>
          {/* Collapse */}
          <div
            className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`}
          >
            {/* Collapse header */}
            <div className="block pb-4 mb-4 border-b border-gray-300 border-solid md:min-w-full md:hidden">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-gray-700 uppercase whitespace-no-wrap md:block md:pb-2"
                    to="/"
                  >
                    Tailwind Starter Kit
                  </Link>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="pt-0 mb-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-12 px-3 py-2 text-base font-normal leading-snug text-gray-700 placeholder-gray-400 bg-white border border-gray-600 border-solid rounded shadow-none outline-none focus:outline-none"
                />
              </div>
            </form>
            {/* Navigation */}
            <ul className="flex flex-col list-none md:flex-col md:min-w-full">
              <li className="items-center">
                <Link
                  className="block py-3 text-xs font-bold text-pink-500 uppercase hover:text-pink-600"
                  to="/dashboard"
                >
                  <i className="mr-2 text-sm opacity-75 fas fa-tv" /> Dashboard
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="block py-3 text-xs font-bold text-gray-800 uppercase hover:text-gray-600"
                  to="/"
                >
                  <i className="mr-2 text-sm text-gray-500 fas fa-newspaper" />{' '}
                  Landing Page
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="block py-3 text-xs font-bold text-gray-800 uppercase hover:text-gray-600"
                  to="/"
                >
                  <i className="mr-2 text-sm text-gray-500 fas fa-user-circle" />{' '}
                  Profile Page
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="block py-3 text-xs font-bold text-gray-800 uppercase hover:text-gray-600"
                  to="/"
                >
                  <i className="mr-2 text-sm text-gray-500 fas fa-fingerprint" />{' '}
                  Login
                </Link>
              </li>

              <li className="items-center">
                <a
                  className="block py-3 text-xs font-bold text-gray-400 uppercase"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <i className="mr-2 text-sm text-gray-400 fas fa-clipboard-list" />{' '}
                  Register (soon)
                </a>
              </li>

              <li className="items-center">
                <a
                  className="block py-3 text-xs font-bold text-gray-400 uppercase"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <i className="mr-2 text-sm text-gray-400 fas fa-tools" />{' '}
                  Settings (soon)
                </a>
              </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pt-1 pb-4 text-xs font-bold text-gray-600 no-underline uppercase md:min-w-full">
              Documentation
            </h6>
            {/* Navigation */}
            <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
              <li className="inline-flex">
                <Link
                  className="block mb-4 text-sm font-semibold text-gray-800 no-underline hover:text-gray-600"
                  to="/"
                >
                  <i className="mr-2 text-base text-gray-500 fas fa-paint-brush" />{' '}
                  Styles
                </Link>
              </li>

              <li className="inline-flex">
                <Link
                  className="block mb-4 text-sm font-semibold text-gray-800 no-underline hover:text-gray-600"
                  to="/"
                >
                  <i className="mr-2 text-base text-gray-500 fab fa-css3-alt" />{' '}
                  CSS Components
                </Link>
              </li>

              <li className="inline-flex">
                <Link
                  className="block mb-4 text-sm font-semibold text-gray-800 no-underline hover:text-gray-600"
                  to="/"
                >
                  <i className="mr-2 text-base text-gray-500 fab fa-vuejs" />{' '}
                  VueJS
                </Link>
              </li>

              <li className="inline-flex">
                <Link
                  className="block mb-4 text-sm font-semibold text-gray-800 no-underline hover:text-gray-600"
                  to="/"
                >
                  <i className="mr-2 text-base text-gray-500 fab fa-react" />{' '}
                  React
                </Link>
              </li>

              <li className="inline-flex">
                <Link
                  className="block mb-4 text-sm font-semibold text-gray-800 no-underline hover:text-gray-600"
                  to="/"
                >
                  <i className="mr-2 text-base text-gray-500 fab fa-angular" />{' '}
                  Angular
                </Link>
              </li>

              <li className="inline-flex">
                <Link
                  className="block mb-4 text-sm font-semibold text-gray-800 no-underline hover:text-gray-600"
                  to="/"
                >
                  <i className="mr-2 text-base text-gray-500 fab fa-js-square" />{' '}
                  Javascript
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
