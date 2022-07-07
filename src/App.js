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
import "./App.scss";

function App() {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [nameCity, setNameCity] = useState("");
  const [dayIndex, setDayIndex] = useState(0);
  const [weather, setWeather] = useState([]);

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
          <Tooltip content={e => renderTooltip(e)} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="choose-day">
        <div
          className={`day ${dayIndex === 0 ? "active" : ""}`}
          onClick={() => setDayIndex(0)}
        >
          Сегодня
        </div>
        <div
          className={`day ${dayIndex === 1 ? "active" : ""}`}
          onClick={() => setDayIndex(1)}
        >
          Завтра
        </div>
        <div
          className={`day ${dayIndex === 2 ? "active" : ""}`}
          onClick={() => setDayIndex(2)}
        >
          Послезавтра
        </div>
        <div
          className={`day ${dayIndex === 3 ? "active" : ""}`}
          onClick={() => setDayIndex(3)}
        >
          На 2 дня вперед
        </div>
        <div
          className={`day ${dayIndex === 4 ? "active" : ""}`}
          onClick={() => setDayIndex(4)}
        >
          На 3 дня вперед
        </div>
      </div>
    </div>
  );
}

export default App;
