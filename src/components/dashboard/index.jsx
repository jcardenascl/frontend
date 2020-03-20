// Dependencies
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getModuleInfo, isBrowser } from 'fogg-utils';
import { document } from 'browser-monads';

// Componentes
import { Sidebar, NavbarDashboard } from '@components';

// Modules
import { Home } from '@modules';

// Contexts
import { UserContext } from '@contexts/user';

// Utils
import formatMoney from '@utils/money';

const Dashboard = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { module, action, id } = getModuleInfo(router);
  const moduleProps = {
    action,
    user,
    id
  };

  let loads = 0;
  let outflows = 0;

  // Effects
  useEffect(() => {
    if (user) {
      const { transactions } = user;

      transactions.forEach(item => {
        if (item.ammount < 0) {
          outflows += item.ammount;
        } else {
          loads += item.ammount;
        }
      });

      const loadsElement = document.querySelector('[data-loads]');
      const outflowsElement = document.querySelector('[data-outflows]');

      loadsElement.innerHTML = formatMoney('USD', loads);
      outflowsElement.innerHTML = formatMoney('USD', outflows);
    }
  }, [user]);

  // Render
  if (isBrowser() && !user) return null;

  return (
    <>
      <div className="flex flex-wrap justify-center h-full">
        <Sidebar />

        <div className="w-full md:w-3/4 lg:w-10/12">
          <div className="p-4 text-white bg-yellow-900">
            <NavbarDashboard user={user} />

            <div className="grid grid-cols-1 gap-8 mb-32 md:grid-cols-2 lg:grid-cols-3">
              <div className="px-6 py-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Salary
                </h3>

                <span className="text-3xl text-blue-500">
                  {user && formatMoney('USD', user.salary)}
                </span>
              </div>
              <div className="px-6 py-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Loads
                </h3>
                <span className="text-3xl text-green-500" data-loads>
                  Loading
                </span>
              </div>
              <div className="px-6 py-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Outflows
                </h3>
                <span className="text-3xl text-red-500" data-outflows>
                  Loading
                </span>
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
    </>
  );
};

Dashboard.getInitialProps = ({ req }) => ({
  params: req.params
});

export default Dashboard;
