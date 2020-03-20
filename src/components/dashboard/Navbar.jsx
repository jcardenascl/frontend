// Dependencies
import React, { useState } from 'react';
import { useTransition, animated, config } from 'react-spring';
import propTypes from 'prop-types';

// Components
import { Link } from '@components';

const Navbar = ({ user }) => {
  // State
  const [openUser, setOpenUser] = useState(false);
  const dropdownTransition = useTransition(openUser, null, {
    from: {
      opacity: 0,
      transform: `scale(${0.9})`,
      transformOrigin: 'top right'
    },
    enter: { opacity: 1, transform: `scale(${1})` },
    leave: { opacity: 0, transform: `scale(${0.9})` },
    config: config.wobbly
  });

  return (
    <>
      <nav className="flex items-center justify-between mb-16">
        <Link
          href="/dashboard"
          className="font-semibold tracking-wider text-white uppercase"
        >
          Expense tracker
        </Link>

        {user && (
          <button
            type="button"
            className="relative flex items-center justify-center py-2 focus:outline-none"
            onClick={() => setOpenUser(!openUser)}
          >
            {user.firstName} {user.lastName}
            <img
              src={user.avatar}
              className="ml-2 rounded-full"
              alt={`${user.firstName} ${user.lastName}`}
              width="30"
              height="30"
            />
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className={`w-5 h-5 ml-2 transition-all duration-200 transform${openUser &&
                ' rotate-180'}`}
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
            {dropdownTransition.map(
              ({ item, key, props }) =>
                item && (
                  <animated.div
                    key={key}
                    style={props}
                    className="absolute right-0 z-10 mt-6 origin-top-right rounded shadow top-1/2 dark:shadow-white"
                  >
                    <div className="w-40 text-left bg-white rounded-lg shadow-lg dark:bg-gray-800">
                      <div className="py-1">
                        <Link
                          href="/logout"
                          title="Log out"
                          className="block px-6 py-3 leading-tight text-red-500 transition-all duration-200 hover:text-gray-700 dark:text-white dark:hover:text-gray-400"
                        >
                          Log out
                        </Link>
                      </div>
                    </div>
                  </animated.div>
                )
            )}
          </button>
        )}
      </nav>

      {openUser && (
        <div
          onClick={() => setOpenUser(false)}
          onKeyDown={() => setOpenUser(false)}
          className="fixed inset-0"
          tabIndex="-1"
          role="button"
          aria-label="Close user menu"
        />
      )}
    </>
  );
};

Navbar.propTypes = {
  user: propTypes.shape({
    firstName: propTypes.string,
    lastName: propTypes.string,
    avatar: propTypes.string
  }).isRequired
};

export default Navbar;
