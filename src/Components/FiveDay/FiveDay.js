import React from 'react';
import './FiveDay.css';

const FiveDay = ({day, temp, icon, weather}) => (
  <div className='day'>
    <p id='day-name'>{new Date(day * 1000).toString().split(' ').shift()}</p>
    <p>{temp} &deg;F</p>
    <i className={'wi owm-' + icon}></i>
    <p>{weather}</p>
  </div>
)

export default FiveDay;
