// Dependencies
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { getModuleInfo, isBrowser } from 'fogg-utils';
import { useTransition, animated, config } from 'react-spring';

// Componentes
import { Link } from '@components';

// Modules
import { Home } from '@modules';

// Contexts
import { UserContext } from '@contexts/user';

// Utils
import formatMoney from '@utils/money';

const Dashboard = () => {
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

  const router = useRouter();
  const { user } = useContext(UserContext);
  const { module, action, id } = getModuleInfo(router);
  const moduleProps = {
    action,
    user,
    id
  };

  // Render
  if (isBrowser() && !user) return null;

  return (
    <>
      <div className="flex flex-wrap justify-center h-full">
        <div className="px-4 py-6 bg-white m-h-screen md:w-1/4 lg:w-2/12">
          Sidebar
        </div>
        <div className="w-full md:w-3/4 lg:w-10/12">
          <div className="p-4 text-white bg-yellow-900">
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

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="px-6 py-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Salary
                </h3>
                <span className="text-3xl text-blue-500">
                  {formatMoney('USD', user.salary)}
                </span>
              </div>
              <div className="px-6 py-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Loads
                </h3>
                <span className="text-3xl text-green-500">$400</span>
              </div>
              <div className="px-6 py-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Outflows
                </h3>
                <span className="text-3xl text-red-500">$400</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full px-2 py-4 transition-all duration-200 md:w-4/5">
              {module === 'home' && <Home {...moduleProps} />}
            </div>
          </div>
        </div>
      </div>

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

Dashboard.getInitialProps = ({ req }) => ({
  params: req.params
});

export default Dashboard;
