import React, { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm/PersonForm";
import Persons from "./components/Persons/Persons";
import apiCall, { getPersons, helpHttp } from "./server/fetch";

function App() {
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState(null);

  const [newName, setNewName] = useState("");
  const [newNumPhone, setNewNumPhone] = useState("");

  const [newSearch, setNewSearch] = useState(false);

  const [filterResult, setFilterResult] = useState([]);
  const [messageLoading, setMessageLoading] = useState("");
  const [messageErrorLoading, setMessageErrorLoading] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameInput = (e) => {
    e.target.name === "name" && setNewName(e.target.value);
    e.target.name === "number" && setNewNumPhone(e.target.value);
  };

  const filterItems = (query) => {
    return persons.filter((element) => {
      return (
        element.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        element.number.indexOf(query) > -1
      );
    });
  };

  const handleSubmitAddPerson = (e) => {
    e.preventDefault();
    let newPerson = { name: newName, number: newNumPhone };
    let checkPerson = persons.filter(
      (element) => element.name === newPerson.name
    );

    checkPerson.length !== 0
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumPhone("");
  };

  const handleSearchPerson = (e) => {
    if (e.target.value !== "") {
      setMessageLoading("searching ... type three characters or more");
      setNewSearch(true);
      let len = e.target.value.length;
      if (len > 2) {
        setMessageLoading("");
        let checkFilter = filterItems(e.target.value);

        if (checkFilter.length !== 0) {
          setFilterResult(checkFilter);
          setLoading(false);
        } else {
          setLoading(true);
          setMessageErrorLoading(
            "searching still, it seems that this person does not exist. have you written good?"
          );
        }
      } else {
        setFilterResult([]);
        setMessageErrorLoading("");
      }
    } else {
      setMessageLoading("");
      setNewSearch(false);
    }
  };

  useEffect(() => {
    // ------------------------
    // Fetch Method persons
    // const searchPeople = () => {
    //   getPersons()
    //     .then((res) => setPersons(res))
    //     .catch(error => console.log('error', error));
    // };
    // searchPeople();

    //  ///////////////////
    // Axios Method Persons
    const getPersons = async () => {
      try {
        const fetchPersons = await apiCall({
          url: "http://localhost:5000/persons",
        });
        setPersons(fetchPersons);
      } catch (error) {
        console.log("error", error);
      }
    };
    // ------------------------
    getPersons();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input name="search" onChange={handleSearchPerson} />
      <br />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmitAddPerson={handleSubmitAddPerson}
        newName={newName}
        newNumPhone={newNumPhone}
        handleNameInput={handleNameInput}
      />
      <br />
      <Persons
        persons={persons}
        newSearch={newSearch}
        messageLoading={messageLoading}
        loading={loading}
        messageErrorLoading={messageErrorLoading}
        filterResult={filterResult}
      />
    </div>
  );
}

export default App;
