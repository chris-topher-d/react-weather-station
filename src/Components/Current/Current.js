import React from 'react';
import './Current.css';

const Current = ({location, date, temp, icon, weather, pressure, humidity, min, max, windSpeed, windDirection}) => (
  <div className='current-container'>
    <div className='location-date'>
      <h3>Current weather in <span style={{color: '#88b4e7'}}>{location}</span></h3>
      <p>{date}</p>
    </div>
    <div className='current-info'>
      <div className='current-temp'>
        <p>{temp} &deg;F</p>
        <i className={icon}></i>
        <p>{weather}</p>
      </div>
      <div className='current-specs'>
        <p>Hi: {max} &deg;F</p>
        <p>Low: {min} &deg;F</p>
        <p>Pressure: {pressure}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {windSpeed} mph</p>
        <p>Wind Direction: {windDirection}&deg;</p>
      </div>
    </div>
  </div>
)

export default Current;
