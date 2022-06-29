import { useState } from "react";
import axios from "axios";

function App() {
  const [nameCity, setNameCity] = useState("");
  const [coord, setCoord] = useState("");

  async function findCity(e) {
    e.preventDefault();
    const weather = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: nameCity,
          appid: "94f0682e42c7aabe667957f6e85d502b",
          units: "metric",
          lang: "ru",
        },
      }
    );

    console.log(weather.data);
  }

  function geo() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoord(
          `Широта ${position.coords.latitude}, Долгота ${position.coords.longitude}`
        );
      });
    }
  }

  return (
    <div className="App">
      <button onClick={geo}>Геолокация</button>
      <form onSubmit={e => findCity(e)}>
        <input
          type="text"
          placeholder="Введите город"
          value={nameCity}
          onChange={e => setNameCity(e.target.value)}
        />
        <button type="submit">Найти</button>
      </form>
      <h1>{coord}</h1>
    </div>
  );
}

export default App;
