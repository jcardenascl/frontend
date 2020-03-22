// Dependencies
import React from 'react';
import { window } from 'browser-monads';
import { format } from 'date-fns';
import propTypes from 'prop-types';
import { PencilOutlineMd, TrashOutlineMd } from 'react-heroicons';

// Utils
import randomId from '@utils/randomId';

const Table = ({ data }) => {
  // Props
  const { caption, head, body, rows, count, actions = null } = data;

  return (
    <table className="w-full -mt-40 overflow-hidden bg-white border-collapse rounded-md shadow">
      <caption className="relative px-10 py-4 text-2xl text-left text-gray-700 capitalize bg-white border border-b-0">
        <div className="float-left">{caption}</div>
        <div className="float-right">
          <i className="fa fa-database" aria-hidden="true" />{' '}
          {count || rows.length}
        </div>
      </caption>

      <thead className="bg-gray-100 border">
        <tr>
          {head.map(th => (
            <th
              key={`th-${randomId()}`}
              className="px-2 py-5 font-bold normal-case"
            >
              {th}
            </th>
          ))}
          {actions && <th key="th-action">Action</th>}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr
            key={`row-${randomId()}`}
            className="transition-all duration-200 border-b border-l border-r hover:bg-gray-100"
          >
            {body.map(tr => {
              const [parent, child] = tr.split('.');
              let values =
                typeof row[parent][child] === 'string'
                  ? row[parent][child]
                  : '';

              if (child) {
                if (Array.isArray(row[parent])) {
                  row[parent].forEach(item => {
                    if (item[child]) {
                      values += `${item[child]} `;
                    } else {
                      values += `${item} `;
                    }
                  });
                }

                return (
                  <td
                    key={`tr-${randomId()}`}
                    className="max-w-xs px-6 py-3 text-lg text-center truncate"
                  >
                    {values}
                  </td>
                );
              }

              if (parent === 'createdAt') {
                return (
                  <td
                    key={`tr-${randomId()}`}
                    className="max-w-xs px-6 py-3 text-lg text-center truncate"
                  >
                    {format(new Date(row[parent]), 'MMM do yyyy')}
                  </td>
                );
              }

              return (
                <td
                  key={`tr-${randomId()}`}
                  className="max-w-xs px-6 py-3 text-lg text-center truncate"
                >
                  {row[parent].toString()}
                </td>
              );
            })}

            {actions && row.id && (
              <td className="flex items-center justify-center max-w-xs px-6 py-3 text-lg truncate">
                {actions.edit && (
                  <a
                    href={`${actions.edit}/${row.id}`}
                    title="Edit"
                    className="block p-3 mx-2 text-gray-700 transition-all duration-200 border rounded-full cursor-pointer hover:text-gray-600"
                  >
                    <PencilOutlineMd className="w-5 h-5" />
                  </a>
                )}{' '}
                {actions.delete && (
                  <button
                    type="button"
                    title="Delete"
                    className="p-3 mx-2 text-gray-700 transition-all duration-200 border rounded-full cursor-pointer hover:text-gray-600"
                    onClick={() => {
                      // eslint-disable-next-line
                      if (confirm('Do you want to delete this row?')) {
                        window.location = `${actions.delete}/${row.id}`;
                      }
                    }}
                  >
                    <TrashOutlineMd className="w-5 h-5" />
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: propTypes.shape({
    caption: propTypes.string.isRequired,
    head: propTypes.oneOfType([propTypes.string, propTypes.array]),
    body: propTypes.oneOfType([propTypes.string, propTypes.array]),
    rows: propTypes.oneOfType([propTypes.any, propTypes.array]),
    count: propTypes.number,
    actions: propTypes.shape({
      edit: propTypes.string,
      delete: propTypes.string
    })
  }).isRequired
};

export default Table;
