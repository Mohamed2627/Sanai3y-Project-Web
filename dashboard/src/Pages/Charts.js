
import React, { useEffect, useState } from "react";
import axios from "axios";
// import "reactochart/styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);




const baseURL = "http://localhost:7000/Jobs/dates";

const Charts = (props) => {
  const [Data, setData] = useState([]);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      // console.log(response.data.data);

      setData(response.data.Data);
      console.log(response.data.Data);
    });
  }, []);
  const options= {responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart Number of jobs for each day',
      },
    },}
    const date4=[]
    Data.map((item)=>{
      date4.push(item.date)})
    console.log(date4);
    const labels = date4.reverse()
  const data2={
    labels,
    datasets: [
      {
        fill: true,
        label: 'Job Count',
        data: Data.map((item)=>item.totalJobs).reverse(),
        borderColor: "rgba(75,192,192,1)",

        backgroundColor: "rgba(75,192,192,.2)",
      },
          
    ],
  };
  return (
    <>
    <Line options={options} data={data2} />
    </>
  );
};

export default Charts;

