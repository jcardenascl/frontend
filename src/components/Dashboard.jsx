// Dependencies
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { getModuleInfo, isBrowser } from 'fogg-utils';

// Componentes
import { Header, Link } from '@components';

// Modules
import { Home } from '@modules';

// Contexts
import { UserContext } from '@contexts/user';

const Dashboard = props => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const { user } = useContext(UserContext);
  const { module, action, id } = getModuleInfo(router);
  const moduleProps = {
    action,
    user,
    id,
    page
  };

  if (isBrowser() && !user) return null;

  return (
    <>
      <Header />

      <div className="container mt-24">
        <div className="flex flex-wrap">
          <div className="w-full p-2 transition-all duration-200 md:w-1/5">
            <div className="flex justify-center">
              <nav id="nav" className="relative w-full">
                <ul className="relative">
                  <li className="my-2">
                    <Link
                      href="/dashboard/home"
                      aria-selected={module === 'home'}
                      className={`flex items-center w-full px-3 py-2 cursor-pointer rounded-lg${
                        module === 'home' ? ' bg-white shadow' : ''
                      } hover:bg-white hover:shadow focus:outline-none focus-visible:underline transition-all duration-200`}
                    >
                      <i
                        className={`${
                          module === 'home' ? 'text-blue-700' : 'text-gray-500'
                        } fas fa-home transition-all ease-out duration-200`}
                      />
                      <span
                        className={`${
                          module === 'home' ? 'text-blue-700' : 'text-gray-700'
                        } ml-2 text-sm font-medium transition-all ease-out duration-200`}
                      >
                        Panel
                      </span>
                    </Link>
                  </li>
                  <li className="my-2">
                    <Link
                      href="/logout"
                      aria-selected={module === ''}
                      className={`flex items-center w-full px-3 py-2 cursor-pointer rounded-lg${
                        module === '' ? ' bg-white shadow' : ''
                      } hover:bg-white hover:shadow focus:outline-none focus-visible:underline transition-all duration-200`}
                    >
                      <i
                        className={`${
                          module === '' ? 'text-blue-700' : 'text-gray-500'
                        } fas fa-sign-out-alt transition-all ease-out duration-200`}
                      />
                      <span
                        className={`${
                          module === '' ? 'text-blue-700' : 'text-gray-700'
                        } ml-2 text-sm font-medium transition-all ease-out duration-200`}
                      >
                        Cerrar Sesión
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="w-full px-2 py-4 transition-all duration-200 md:w-4/5">
            {module === 'home' && <Home {...moduleProps} />}
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.getInitialProps = ({ req }) => ({
  params: req.params
});

export default Dashboard;
