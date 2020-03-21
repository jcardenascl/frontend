// Dependencies
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

// Components
import { Table } from '@components';

const Read = ({ read, page, module, head, body, caption }) => {
  // States
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  // Methods
  const fetchData = async () => {
    const res = await read(Number(page));

    setCount(res.count);
    setData(res.data);
  };

  // Effects
  useEffect(() => {
    fetchData();
  }, [data, page]);

  // Render
  if (data.length === 0) return null;

  const tableData = {
    caption,
    head,
    body,
    rows: data,
    count,
    actions: {
      edit: `/dashboard/${module}/update`,
      delete: `/dashboard/${module}/delete`
    }
  };

  return (
    <>
      <Table data={tableData} module={module} page={page} />

      {/* <Pagination
        page={page}
        total={count}
        url={`/dashboard/${module}?page=`}
      /> */}
    </>
  );
};

Read.propTypes = {
  caption: propTypes.string.isRequired,
  module: propTypes.string.isRequired,
  read: propTypes.func.isRequired,
  head: propTypes.oneOfType([propTypes.array.isRequired]).isRequired,
  body: propTypes.oneOfType([propTypes.array.isRequired]).isRequired,
  page: propTypes.number.isRequired
};
export default Read;
