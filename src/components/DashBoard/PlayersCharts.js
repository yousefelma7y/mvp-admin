import React, { useRef, useState } from 'react';
import { Slider } from '@mui/material';

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
import { Line ,getElementAtEvent } from 'react-chartjs-2';

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

function valuetext(value) {
  return `${value}°C`;
}
const minDistance = 10;

const PlayersCharts = () => {
  // const [score, setScore] = useState([]);
  const [players, setPlayers] = useState({
    "results": [
      {
        'username' : 'Yousef' ,
        'score' : 100
      },
      {
        'username' : 'diso' ,
        'score' : 200
      },
      {
        'username' : 'Ziad' ,
        'score' : 500
      },
      {
        'username' : 'Ahmed' ,
        'score' : 700
      },
      {
        'username' : 'Saif' ,
        'score' : 250
      },
      {
        'username' : 'Mohamed' ,
        'score' : 800
      },
    ]
  });

for (var k1 in players.results)
for (var k2 in players.results)
if (players.results[k1].score < players.results[k2].score){ 
[players.results[k1], players.results[k2]] =
[players.results[k2], players.results[k1]];
}

const chartRef = useRef();
const labels = players.results.map((data)=> data.username);
const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Players Score',
      data: players.results.map((data)=> data.score),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
  },
  // onClick: (e, elements) => {
  //   if (!elements.length == 0){
  //     setScore([players.results[elements[0].element.$context.parsed.x]]);
  //   }else{
  //     setScore([]);
  //   }
  // },
};
const [value2, setValue2] = React.useState([0, players.results[players.results.length-1].score]);
const handleChange2 = (event, newValue, activeThumb) => {
  if (!Array.isArray(newValue)) {
    return;
  }
  if (newValue[1] - newValue[0] < minDistance) {
    if (activeThumb === 0) {
      const clamped = Math.min(newValue[0], 1000 - minDistance);
      setValue2([clamped, clamped + minDistance]);
    } else {
      const clamped = Math.max(newValue[1], minDistance);
      setValue2([clamped - minDistance, clamped]);
    }
  } else {
    setValue2(newValue);
  }
};
  return (
  <div className='row col-12 justify-content-center p-0 m-0 my-4'>
    <div className='col-lg-7 col-md-10 col-12 bg-white rounded'>
      <Line ref={chartRef}  options={options} data={data} />
    </div>  
    <div className='col-8 p-3 '>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={0}
        max={players.results[players.results.length-1].score}
      />
    </div>
    <div className='row col-lg-10 col-12 bg-secondary text-white rounded fw-bold mt-3 py-2'>
      <p className='col-6'>UserName </p>
      <p className='col-6'>Score </p>
    </div>
    {!players.results.length==0 ? players.results.map((data)=> (
     value2[0]<=data.score && data.score<=value2[1] &&
      <div key={data.username} className='row col-lg-10 col-12  bg-white text-black rounded fw-bold m-1 p-2'>
          <p className='col-6'>{data.username} </p>
          <p className='col-6'>{data.score} </p>
      </div> 
    ))
   : <h3 className='p-3'>Chose A Player From Chart</h3> }
  </div>
  )
}

export default PlayersCharts
