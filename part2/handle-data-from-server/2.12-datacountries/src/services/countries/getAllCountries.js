import axios from "axios";
// API: https://restcountries.com/...
export const getAllCountries = () => {
  return axios
    .get(process.env.REACT_APP_URL_COUNTRI)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((error) => error);
};
