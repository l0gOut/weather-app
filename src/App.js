import {
  AreaChart,
  Area,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import { useState, useEffect } from "react";
import { getWeather } from "./axios.js";

function App() {
  const [nameCity, setNameCity] = useState("");

  async function findCity(e) {
    e.preventDefault();

    getWeather({
      q: nameCity,
    }).then(data => console.log(data));
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        getWeather({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }).then(data => console.log(data));
      });
    }
  }, []);

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
      <AreaChart
        width={1000}
        height={300}
        data={[
          { name: "a", temp: 10 },
          { name: "b", temp: 18 },
          { name: "c", temp: 20 },
          { name: "d", temp: 5 },
          { name: "e", temp: 12 },
          { name: "f", temp: 26 },
          { name: "j", temp: 18 },
        ]}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
            <stop offset="95%" stopColor="orange" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="temp"
          type="monotone"
          stroke="orange"
          fill="url(#colorPv)"
        />
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip content={renderTooltip} />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      </AreaChart>
    </div>
  );
}

export default App;
