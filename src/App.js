import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { getWeather } from "./axios.js";

function App() {
  const [nameCity, setNameCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);

  async function findCity(e) {
    e.preventDefault();

    getWeather({
      q: nameCity,
    }).then(data => setWeather(data.list));
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        getWeather({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }).then(data => setWeather(data.list));
      });
    }
  }, []);

  useEffect(() => {
    if (weather.length > 0) {
      const weatherList = [];
      for (let i = 0; i <= 7; i++) {
        weatherList.push({
          name: weather[i].dt_txt.match(/[0-9][0-9]:00/),
          temp: Math.round(weather[i].main.temp),
        });
      }
      setCurrentWeather(weatherList);
    }
  }, [weather]);

  function renderTooltip(e) {
    const { payload, label } = e;

    return (
      <div>
        <p>{label}</p>
        <ul>
          {payload.map((value, index) => (
            <li key={index}>Температура: {value.value}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="App">
      <form onSubmit={e => findCity(e)}>
        <input
          type="text"
          placeholder="Введите город"
          value={nameCity}
          onChange={e => setNameCity(e.target.value)}
        />
        <button type="submit">Найти</button>
      </form>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={currentWeather}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
              <stop offset="95%" stopColor="orange" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            isAnimationActive={false}
            dataKey="temp"
            type="monotone"
            stroke="orange"
            fill="url(#colorPv)"
          >
            <LabelList dataKey="temp" position="top" />
          </Area>
          <YAxis
            tickLine={false}
            axisLine={false}
            ticks={[0, 8, 16, 24, 32, 40]}
            tick={false}
          />
          <XAxis tickLine={false} axisLine={false} dataKey="name" />
          <Tooltip content={renderTooltip} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
