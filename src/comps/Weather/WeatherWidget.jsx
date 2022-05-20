import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './WeatherWidget.css'
import {Weather} from './Weather';
import { useOnClickOutside } from '../../hooks'
import {loaderGif} from '../../assets';

function WeatherWidget() {
    const [showWeather, setShowWeather] = useState(false);
    const [loading, setLoading] = useState(false);
    const showWeatherRef = useOnClickOutside(() => setShowWeather(false), showWeather);

    const weatherInitialState = {
        icon: '',
        location: '',
        status: '',
        temp: '',
        wind: '',
        feelsLike: '',
        humidity: '',
        sunrise: '',
        sunset: '',
    }
    const [weather, setWeather] = useState(weatherInitialState);

    const API_KEY = '8e1724f6c49204db0db08a7ddcba09de';

    const getAPI = (lat, lon) => {
        let API = "";
        if(lat === undefined || lon === undefined) {
            API = `https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=${API_KEY}`;
        } else {
            API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        }
        return API;
    }

    const fetchWeather = async(lat, lon) => {
        setLoading(true)
        const API = getAPI(lat, lon);

        try {
            const res = await axios.get(API);
            const data = res.data;
            setWeather({
                icon: data.weather[0].icon,
                location: data.name,
                status: data.weather[0].description,
                temp: Math.round(res.data.main.temp - 273.15),
                wind: data.wind.speed,
                feelsLike: Math.round(res.data.main.feels_like - 273.15),
                humidity: data.main.humidity,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,

            });
            res && setTimeout(() => {setLoading(false)}, 2500)
        } catch(err) {
            console.log(err);
        }
    }

    const success = (loc) => {
        const crd = loc.coords;
        fetchWeather(crd.latitude, crd.longitude);
    };

    const error = (err) => {
        fetchWeather();
    };

    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(success, error);
    };

    useEffect(() => {
        fetchWeather();
        getGeoLocation();
    }, [])

    
  return (
    <div className='WeatherWidget flex-centered flex-col' ref={showWeatherRef}>
        {loading &&
        <span className="loader-wrapper flex-centered align-right">
        <img src={loaderGif} alt="loading" className='loader'/>
        </span>}
        {!loading &&
        <>
        <span className="widget-head flex-centered" onClick={() => setShowWeather(prev => !prev)}>
            <span className="widget-icon">
                <img alt="weather-icon" src={`http://openweathermap.org/img/w/${weather.icon}.png`} width="60" height="40" />
            </span>
            <span className="widget-status">{weather.temp}°</span>
        </span>
        <span className="widget-bottom flex-centered">
            <span className="widget-location">{weather.location}</span>
        </span>
        </>}
        {showWeather && <Weather weather={weather} />}
        
    </div>
  )
}

export {WeatherWidget}