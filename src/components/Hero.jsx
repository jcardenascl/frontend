// Dependencies
import React from 'react';

// Components
import { Link } from '@components';

export default () => (
  <div className="py-32 bg-yellow-600">
    <div className="container px-5">
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-full sm:w-1/2 md:w-3/5">
          <h2 className="text-6xl font-bold text-white">Expense Tracker</h2>

          <h3 className="max-w-lg mb-10 text-xl font-light text-white">
            Manage your money inflows and outflows to save and achieve your
            goals as quickly as possible
          </h3>

          <Link
            className="px-8 py-3 text-xl text-white transition-all duration-200 bg-yellow-700 rounded-md shadow hover:bg-yellow-900"
            href="/login"
          >
            Sign up now
          </Link>
        </div>
        <div className="w-full sm:w-1/2 md:w-2/5">
          <img alt="Expense Tracker" className="w-full" src="/money.png" />
        </div>
      </div>
    </div>
  </div>
);
