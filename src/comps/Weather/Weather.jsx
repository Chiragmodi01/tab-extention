import React from 'react'
import './Weather.css'
import { WiSunrise, WiSunset } from '../../utils/getIcons';

function Weather({weather}) {
    let sunriseTime = `${new Date(weather.sunrise).getHours()}:${new Date(weather.sunrise).getMinutes()}`;
    let sunsetTime = `${new Date(weather.sunset).getHours()}:${new Date(weather.sunset).getMinutes()}`;

  return (
    <div className='Weather'>
        <div className="weather-main flex-col align-start justify-center">
            <div className="weather-top flex-centered flex-col align-start">
                <span className="weather-top-header flex-col">
                    <span className="weather-location">{weather.location}</span>
                    <span className="weather-status">{weather.status}</span>
                </span>
                <span className="weather-top-bottom flex-centered justify-start">
                    <span className="weather-icon">
                    <img alt="weather-icon" src={`http://openweathermap.org/img/w/${weather.icon}.png`} width="100" height="80" />
                    </span>
                    <span className="weather-temp">{weather.temp}°</span>
                    <span className="weather-top-bottom-right flex-col align-start">
                        <span className="weather-feels-like"><span className='title-grey'>Wind  </span>{weather.wind}km/h</span>
                        <span className="weather-feels-like"><span className='title-grey'>Feels like  </span>{weather.feelsLike}°</span>
                        <span className="weather-feels-like"><span className='title-grey'>Humidity  </span>{weather.humidity}%</span>
                    </span>
                </span>
            </div>
            <div className="weather-bottom flex-centered justify-start">
                <span className="weather-bottom-item flex-centered">
                    <WiSunrise size="3.5em"/>
                    <span className="flex-col align-center">
                        <span className="title">Sunrise</span>
                        <span className="sun-time">{sunriseTime}</span>
                    </span>
                </span>
                <span className="weather-bottom-item flex-centered">
                <WiSunset size="3.5em"/>
                    <span className="flex-col align-center">
                        <span className="title">Sunset</span>
                        <span className="sun-time">{sunsetTime}</span>
                    </span>
                </span>
            </div>
        </div>
    </div>
  )
}

export {Weather}