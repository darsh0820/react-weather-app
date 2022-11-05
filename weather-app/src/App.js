import { useState } from 'react';
import './App.css';
const api = {
  key: "6a80ae274a5a4508418905a6bf814617",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState([]);

  const search = evt => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
      })
    }
  }

  const dateBuilder = (d) => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  const dir = (num) => {
  // let num = weather.wind.deg
  var val = Math.floor((num / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
  
  }

  return (
    <div className={(typeof weather.main  != "undefined")?
      (weather.main.temp > 16)?
        'app warm'
        : 'app'
      :'app'}>
      <main>
        <div className='search-box'>
          <input type="text" className='search-bar' placeholder='Search here...' 
          onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}></input>
        </div>
        <div>
          {(typeof weather.main != "undefined")?(
            <div>
              <div className='location-box'>
              <div className='location'>{weather.name},{weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='values'>
                <div className='feel'>Feels Like {Math.round(weather.main.feels_like)}°C</div>
                <div className='temp'>{Math.round(weather.main.temp)}°C</div>
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
            <div className='misc-values'>
                  <div>
                    <div className='misc'>Humidity: <br></br>{weather.main.humidity}%</div>
                    <div className='misc'>Pressure: <br></br>{(Math.round(weather.main.pressure*0.030*100)/100).toFixed(2)}"</div>
                  </div>
                  <div>
                  <div className='misc'>Wind speed: <br></br>{weather.wind.speed}m/s</div>
                  <div className='misc'>Wind Direction: <br></br>{dir(weather.wind.deg)}</div>
                  </div>
                </div>
            </div>
          ) : ('')}
          
        </div>
        
      </main>
    </div>
  );
}

export default App;
