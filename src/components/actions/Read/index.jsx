// Dependencies
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { format } from 'date-fns';
import { PencilOutlineMd, TrashOutlineMd } from 'react-heroicons';
import Tippy from '@tippyjs/react';

// Components
import { Fade, Pagination, CreateTransactionModal } from '@components';

// Utils
import formatMoney from '@utils/money';

const Read = ({ read, page, module, caption }) => {
  // States
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [isOpen, setOpen] = useState(false);

  // Methods
  const fetchData = async pageNumber => {
    const res = await read(Number(pageNumber));

    setCount(res.count);
    setData(res.data);
  };

  // Effects
  useEffect(() => {
    fetchData(page);
  }, [data, page]);

  // Render
  if (data.length === 0) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-medium text-gray-700 capitalize">
          {caption}
        </h1>

        <button
          type="button"
          // href={`/dashboard/${module}/create`}
          className="block px-6 py-2 text-white bg-yellow-900 rounded-lg shadow focus:outline-none"
          onClick={() => setOpen(!isOpen)}
        >
          Create
        </button>
      </div>

      <hr className="mb-6 border-gray-300" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.map(item => (
          <Fade key={item.id}>
            <div className="px-6 py-4 bg-white rounded-lg shadow">
              <h2 className="text-sm font-bold text-gray-500 uppercase">
                {item.description}
              </h2>
              <span
                className={`text-3xl font-medium ${
                  item.ammount < 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {formatMoney(item.currency, item.ammount)}
              </span>

              <div className="flex items-center justify-center">
                <div className="w-1/2">
                  <span className="text-sm text-gray-500">
                    {format(new Date(item.createdAt), 'MMM do yyyy')}
                  </span>
                </div>
                <div className="flex justify-end w-1/2">
                  <Tippy content="Edit">
                    <a
                      href={`/dashboard/${module}/update/${item.id}`}
                      title="Edit"
                      className="block p-3 mx-2 text-gray-700 transition-all duration-200 border rounded-full cursor-pointer hover:text-gray-600"
                    >
                      <PencilOutlineMd className="w-5 h-5" />
                    </a>
                  </Tippy>

                  <Tippy content="Delete">
                    <button
                      type="button"
                      title="Delete"
                      className="p-3 mx-2 text-gray-700 transition-all duration-200 border rounded-full cursor-pointer hover:text-gray-600"
                      onClick={() => {
                        // eslint-disable-next-line
                        if (confirm('Do you want to delete this row?')) {
                          window.location = `/dashboard/${module}/delete/${item.id}`;
                        }
                      }}
                    >
                      <TrashOutlineMd className="w-5 h-5" />
                    </button>
                  </Tippy>
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>

      <Fade>
        <Pagination
          page={page}
          total={count}
          url={`/dashboard/${module}?page=`}
        />
      </Fade>

      <CreateTransactionModal open={isOpen} setOpen={setOpen} />
    </>
  );
};

Read.propTypes = {
  caption: propTypes.string.isRequired,
  module: propTypes.string.isRequired,
  read: propTypes.func.isRequired,
  page: propTypes.number.isRequired
};
export default Read;
