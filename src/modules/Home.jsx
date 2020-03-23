// Dependencies
import React, { createRef, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Chart from 'chart.js';
import { format } from 'date-fns';

// Contexts
import { UserContext } from '@contexts/user';

// Components
import { Loading } from '@components';

const Home = ({ action }) => {
  const { user } = useContext(UserContext);

  // Refs
  const chartRef = createRef();
  let loads = [];
  let loadsDates = [];
  let outflows = [];
  let outflowsDates = [];

  // Effects
  useEffect(() => {
    if (user) {
      const { transactions } = user;

      transactions.forEach(item => {
        if (item.ammount < 0) {
          outflows = [...outflows, item.ammount];
          outflowsDates = [
            ...outflowsDates,
            format(new Date(item.createdAt), 'MMMM')
          ];
        } else {
          loads = [...loads, item.ammount];
          loadsDates = [
            ...loadsDates,
            format(new Date(item.createdAt), 'MMMM')
          ];
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const myChartRef = chartRef.current.getContext('2d');

      new Chart(myChartRef, {
        type: 'line',
        data: {
          labels: ['March'],
          datasets: [
            {
              label: 'Loads',
              data: loads,
              backgroundColor: '#48bb78'
            },
            {
              label: 'Outflows',
              data: outflows,
              backgroundColor: '#f56565'
            }
          ]
        },
        options: {}
      });
    }
  }, [user]);

  if (!user) return <Loading spacing="py-32" />;

  console.log(loads, outflows);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <canvas id="myChart" ref={chartRef} />
      </div>
      <div>a</div>
    </div>
  );
};

Home.defaultProps = {
  action: ''
};

Home.propTypes = {
  action: propTypes.string
};

export default Home;
