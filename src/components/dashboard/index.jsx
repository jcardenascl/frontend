// Dependencies
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getModuleInfo } from 'fogg-utils';
import { document } from 'browser-monads';

// Componentes
import { Sidebar, NavbarDashboard, Fade } from '@components';

// Modules
import { Home, Transactions } from '@modules';

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
  let totals = 0;

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

      totals = loads - Math.abs(outflows);

      const loadsElement = document.querySelector('[data-loads]');
      const outflowsElement = document.querySelector('[data-outflows]');
      const totalsElement = document.querySelector('[data-totals]');

      loadsElement.innerHTML = formatMoney('USD', loads);
      outflowsElement.innerHTML = formatMoney('USD', outflows);
      totalsElement.innerHTML = formatMoney('USD', totals);
    }
  }, [user]);

  // Render
  return (
    <div className="flex flex-wrap justify-center h-full">
      <Sidebar />

      <Fade className="w-full md:w-3/4 lg:w-10/12">
        <div className="p-4 text-white bg-yellow-900">
          <NavbarDashboard user={user} />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Fade>
              <div className="px-6 py-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Salary
                </h3>

                <span className="text-3xl font-semibold text-blue-500">
                  {user ? formatMoney('USD', user.salary) : 'Loading'}
                </span>
              </div>
            </Fade>

            <Fade>
              <div className="px-6 py-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Loads
                </h3>
                <span className="text-3xl text-green-500" data-loads>
                  Loading
                </span>
              </div>
            </Fade>

            <Fade>
              <div className="px-6 py-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Outflows
                </h3>
                <span className="text-3xl text-red-500" data-outflows>
                  Loading
                </span>
              </div>
            </Fade>

            <Fade>
              <div className="px-6 py-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-bold text-gray-500 uppercase">
                  Totals
                </h3>
                <span
                  className="text-3xl font-semibold text-orange-500"
                  data-totals
                >
                  Loading
                </span>
              </div>
            </Fade>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-5 py-4 transition-all duration-200">
            {module === 'home' && <Home {...moduleProps} />}
            {module === 'transactions' && <Transactions {...moduleProps} />}
          </div>
        </div>
      </Fade>
    </div>
  );
};

Dashboard.getInitialProps = ({ req }) => ({
  params: req.params
});

export default Dashboard;
