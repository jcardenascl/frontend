import React from 'react';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="absolute top-0 flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 navbar-expand-lg">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="inline-block py-2 mr-4 text-sm font-bold leading-relaxed uppercase whitespace-no-wrap"
              href="#pablo"
            >
              Expense Tracker
            </a>
            <button
              className="block px-3 py-1 text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
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
          <div
            className={`lg:flex flex-grow items-center${
              navbarOpen ? ' flex' : ' hidden'
            }`}
            id="example-navbar-danger"
          >
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg text-white opacity-75 fab fa-facebook-square leading-lg" />
                  <span className="ml-2">Share</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg text-white opacity-75 fab fa-twitter leading-lg" />
                  <span className="ml-2">Tweet</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-white uppercase hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg text-white opacity-75 fab fa-pinterest leading-lg" />
                  <span className="ml-2">Pin</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
