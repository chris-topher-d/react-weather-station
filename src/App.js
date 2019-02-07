import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Search from './Components/Search/Search'
import Current from './Components/Current/Current';
import FiveDay from './Components/FiveDay/FiveDay';

import { api } from './apiKey';
const apiURL = 'https://api.openweathermap.org/data/2.5/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      current: {},
      fiveDay: {
        cod: '',
        list: []
      },
      error: ''
    }
    this.findWeather = this.findWeather.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this.getWeather('lat=' + lat + '&lon=' + lon);
      });
    }
  }

  getWeather(location) {
    let th = this;
    fetch(apiURL + 'weather?' + location + '&units=imperial' + api)
    .then(response => response.json())
    .then(data => {
      th.setState({
        current: {
          cod: data.cod,
          location: data.name,
          weather: data.weather[0].main,
          icon: 'wi owm-' + data.weather[0].icon,
          temp: data.main.temp,
          pressure: Math.round(data.main.pressure),
          humidity: Math.round(data.main.humidity),
          min: data.main.temp_min,
          max: data.main.temp_max,
          windSpeed: Math.round(data.wind.speed),
          windDirection: data.wind.deg ? Math.round(data.wind.deg) : 0,
        }
      })
    })
    .catch(err => {
      this.setState({error: 'Please enter city name or 5 digit zip code'});
    });

    fetch(apiURL + 'forecast?' + location + '&units=imperial' + api)
    .then(response => response.json())
    .then(data => {
      let arr = data.list.filter(item => {
        let time = new Date(item.dt * 1000);
        if (time.getTimezoneOffset() === 360) {
          if (time.toString().split(' ')[4] === '15:00:00') return item;
        } else if (time.getTimezoneOffset() === 300) {
          if (time.toString().split(' ')[4] === '16:00:00') return item;
        }
      });

      th.setState({
        fiveDay: {
          cod: data.cod,
          list: arr
        }
      })
    })
    .catch(err => {
      this.setState({error: 'Please enter city name or 5 digit zip code'});
    });
  }

  findWeather(e) {
    let location = e.match(/[0-9]/) && e.length === 5 ? 'zip=' + e : 'q=' + e;
    this.getWeather(location);
    this.setState({error: ''});
  }

  render() {
    const current = (
      <Current
        location={this.state.current.location}
        date={this.state.date.toString().split(' ').slice(0, 3).join(' ')}
        temp={this.state.current.temp}
        icon={this.state.current.icon}
        weather={this.state.current.weather}
        pressure={this.state.current.pressure}
        humidity={this.state.current.humidity}
        min={this.state.current.min}
        max={this.state.current.max}
        windSpeed={this.state.current.windSpeed}
        windDirection={this.state.current.windDirection}
      />
    );

    const fiveDay = this.state.fiveDay.list.map(day => (
      <FiveDay
        key={day.dt}
        day={day.dt}
        temp={Math.round(day.main.temp)}
        icon={day.weather[0].icon}
        weather={day.weather[0].main}
      />
    ));

    return (
      <div className="App">
        <Header />
        <Search findWeather={this.findWeather} error={this.state.error}/>
        {this.state.current.cod && current}
        <div className='week'>
          {this.state.fiveDay.cod && fiveDay}
        </div>
      </div>
    );
  }
}

export default App;
