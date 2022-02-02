import axios from "axios";
// API: api.openweathermap.org/data/2.5/...
// https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiClima}
export const getWather = (countri) => {
  //  + '?q=' + {countri} + "&appid=" + process.env.REACT_APP_API_KEY
  // return axios.get(`https:api.openweathermap.org/data/2.5/weather?q=${countri}&appid=0eca7da4f9c99ccfa4a6f8100dd392d1`)
  return axios
    .get(
      `${process.env.REACT_APP_URL_WATHER}?q=${countri}&appid=${process.env.REACT_APP_API_KEY}`
    )
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((error) => error);
};
