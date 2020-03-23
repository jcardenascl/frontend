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
  const loads = [];
  const loadsDates = [];
  const outflows = [];
  const outflowsDates = [];

  // Effects
  // useEffect(() => {
  //   if (user) {
  //     const { transactions } = user;

  //     transactions.forEach(item => {
  //       if (item.ammount < 0) {
  //         outflows = [...outflows, item.ammount];
  //         outflowsDates = [
  //           ...outflowsDates,
  //           format(new Date(item.createdAt), 'MMMM')
  //         ];
  //       } else {
  //         loads = [...loads, item.ammount];
  //         loadsDates = [
  //           ...loadsDates,
  //           format(new Date(item.createdAt), 'MMMM')
  //         ];
  //       }
  //     });
  //   }
  // }, [user]);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: ['March'],
        datasets: [
          {
            label: 'Outflows',
            data: [100, 30],
            backgroundColor: 'rgba(229, 62, 62, 0.5)',
            borderColor: 'rgb(229, 62, 62)'
          },
          {
            label: 'Loads',
            data: [300, 350],
            backgroundColor: 'rgba(56, 161, 105, 0.5)',
            borderColor: 'rgb(56, 161, 105)'
          }
        ]
      },
      options: {}
    });
  }, []);

  // if (!user) return <Loading spacing="py-32" />;

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
