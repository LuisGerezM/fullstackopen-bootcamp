export default async function apiCall({ url, method, body, headers }) {
  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
    });

    return response.json();
  } catch (error) {
    // retornamos respuesta fallida
    Promise.reject(error);
  }
}

// este método definir en el context
export const getPersons = async() => {
  try {
    const persons = await apiCall({
      url: 'http://localhost:5000/persons'
    })
    //console.log('persons', persons);
    return persons
  } catch (error) {
    console.log('error', error);
  }
}