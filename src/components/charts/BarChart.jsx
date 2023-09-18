import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({data, options}) => { //{data, options}

  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May'],
  //   datasets: [
  //     {
  //       label: 'Sales Data',
  //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
  //       hoverBorderColor: 'rgba(75, 192, 192, 1)',
  //       data: [65, 59, 80, 81, 56],
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false
  //       // position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       // text: 'Land Cover Chart',
  //     },
  //   },
  // };


  return (
    <div>
        <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart