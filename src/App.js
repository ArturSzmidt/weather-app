import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';

const URL = `https://api.openweathermap.org/data/2.5/onecall`;
const API_KEY = `f4c0a0fbf16c61baad0dbe5e4994a93a
`;

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const [data, setData] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log('Latitude :', position.coords.latitude);
      console.log('Longitude :', position.coords.longitude);
    });

    async function fetchData() {
      let resp = await fetch(
        `${URL}?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`
      );
      const data = await resp.json();
      console.log(data);
      setData(data);
      setSunset(data.current.sunset);
      setSunrise(data.current.sunrise);
      setHumidity(data.current.humidity);
      setCity(data.timezone);
      setTemperature(data.current.temp);
    }
    fetchData();
  }, [latitude, longitude]);
  return (
    <div className="main">
      <Header />
      <WeatherCard
        temperature={temperature}
        humidity={humidity}
        sunrise={sunrise}
        sunset={sunset}
        city={city}
      />
    </div>
  );
}

export default App;
