import axios from "axios";

export default async function apiCall({
  url,
  method = "get",
  email = null,
  password = null,
}) {
  try {
    let response = null

    if (email && password) {
      response = await axios({
        method,
        url,
        data: {
          email,
          password,
        },
      });
    } else {
      response = await axios({
        method,
        url,
      });
    }
    return response;
  } catch (error) {
    console.log('error', error);    
  }
}
