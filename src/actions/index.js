import axios from "axios";

const API = `https://api.openweathermap.org/data/2.5/weather?`;
const KEY = "APPID=2f083dd172c3350e1cc1b77003f56a8c";

export const GET_WEATHER_DATA = "GET_WEATHER_DATA";

export async function getWeatherData(lat, lon) {
  const APIURL =
    API + `lat=` + lat + `&lon=` + lon + `&` + KEY + `&mode=xml&units=metric`;
  const request = axios.get(APIURL);

  return {
    type: GET_WEATHER_DATA,
    payload: request
  };
}
