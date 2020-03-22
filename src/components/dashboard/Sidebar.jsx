// Dependencies
import React from 'react';

// Components
import { Link, Fade } from '@components';

export default () => (
  <Fade className="px-4 py-6 bg-white m-h-screen md:w-1/4 lg:w-2/12">
    <ul>
      <li className="px-2">
        <Link
          href="/dashboard/transactions"
          className="flex items-center justify-center px-1 py-3 text-sm font-bold text-blue-700 uppercase transition-all duration-200 border rounded-md shadow hover:text-white hover:bg-blue-700 hover:border-blue-700"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6 mr-2 opacity-75"
          >
            <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          Transactions
        </Link>
      </li>
    </ul>
  </Fade>
);
