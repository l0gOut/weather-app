import axios from "axios";

const url = "https://api.openweathermap.org/data/2.5/forecast";
const appid = "94f0682e42c7aabe667957f6e85d502b";
const units = "metric";
const lang = "ru";
const cnt = 32;

export async function getWeather({ q = "", lat = "", lon = "" }) {
  if (q !== "") {
    const weather = await axios.get(url, {
      params: {
        q,
        appid,
        units,
        lang,
        cnt,
      },
    });

    return weather.data;
  } else {
    const weather = await axios.get(url, {
      params: {
        appid,
        units,
        lang,
        cnt,
        lat,
        lon,
      },
    });

    return weather.data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getWeather,
};
