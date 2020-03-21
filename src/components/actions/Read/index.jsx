// Dependencies
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

// Components
import { Fade, Table, Pagination } from '@components';

const Read = ({ read, page, module, head, body, caption }) => {
  // States
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

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
      <Fade>
        <Table data={tableData} module={module} page={page} />
      </Fade>

      <Fade>
        <Pagination
          page={page}
          total={count}
          url={`/dashboard/${module}?page=`}
        />
      </Fade>
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
