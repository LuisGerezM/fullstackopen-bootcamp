import React, { useEffect, useState } from "react";
import Notification from "./components/notification/Notification";
import PersonForm from "./components/PersonForm/PersonForm";
import Persons from "./components/Persons/Persons";
import { filterEqualPeople } from "./helper/filterPerson";
import personService from "./server/axios";

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumPhone, setNewNumPhone] = useState("");

  const [newSearch, setNewSearch] = useState(false);

  const [filterResult, setFilterResult] = useState([]);
  const [messageLoading, setMessageLoading] = useState("");
  const [messageErrorLoading, setMessageErrorLoading] = useState("");
  const [loading, setLoading] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [messageNotification, setMessageNotification] = useState({
    message: "",
    type: "",
  });
  const [showNotification, setShowNotification] = useState(false);

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
    // let checkPerson = persons.filter(
    //   (element) => element.name === newPerson.name
    // );

    // modularizamos funcion filtro
    let checkPerson = filterEqualPeople(newPerson, persons);

    // checkPerson.length !== 0
    //   ? alert(`${newName} is already added to phonebook`)
    //   : addPerson(newPerson);

    // añadiendo update a nro de telefono
    checkPerson.length !== 0
      ? window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        ) && updateNumberPerson(newPerson)
      : addPerson(newPerson);

    setNewName("");
    setNewNumPhone("");
  };

  const updateNumberPerson = (newPerson) => {
    let checkPerson = filterEqualPeople(newPerson, persons);
    let id = checkPerson[0].id;

    checkPerson.length !== 0 &&
      personService
        .update(id, newPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
          handleMessageNotification(
            `Update ${returnedPerson.name} successfully`,
            "success"
          );
        })
        .catch((error) => console.log("error", error));
  };

  const addPerson = (newPerson) => {
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons((prevState) => [...prevState, returnedPerson]);
        handleMessageNotification(`added ${returnedPerson.name}`, "success");
      })
      .catch((error) =>
        console.log("hubo un error al añadir una persona", error)
      );
  };

  const deletePerson = (id) => {
    setPersons(persons.filter((element) => element.id !== id));
    handleMessageNotification(
      "This person was successfully removed!",
      "danger",
      "bot"
    );
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

  const handleMessageNotification = (message, type, position = null) => {
    setMessageNotification({
      message: message,
      type: type,
    });
    position ? setShowDelete(true) : setShowNotification(true);
    setTimeout(() => {
      setMessageNotification({ message: null, type: "" });
      position ? setShowDelete(false) : setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => {
        alert(`we had a problem finding people`);
        console.log("error", error);
      });
  }, []);

  return (
    <div>
      {showNotification && (
        <Notification messageNotification={messageNotification} />
      )}
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
        deletePerson={deletePerson}
        handleMessageNotification={handleMessageNotification}
      />
      {showDelete && <Notification messageNotification={messageNotification} />}
    </div>
  );
}

export default App;
