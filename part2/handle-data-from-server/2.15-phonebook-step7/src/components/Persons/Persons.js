import React from "react";
import Numbers from "./Numbers";
import ResultSearch from "./ResultSearch";
import noteService from "../../server/axios";

const Persons = ({
  persons,
  newSearch,
  messageLoading,
  loading,
  messageErrorLoading,
  filterResult,
  deletePerson,
  handleMessageNotification,
}) => {
  const handleDeletePerson = (person) => {
    const { name, number, id } = person;

    window.confirm(`Are you sure to delete ${name} with phone ${number}`) &&
      noteService
        .remove(id)
        .then(
          (returnedResponse) =>
            returnedResponse.statusText.toLowerCase() === "ok" &&
            deletePerson(id)
        )
        .catch((error) =>
          handleMessageNotification(
            `Information of ${name} with number ${number} has already been removed from server`,
            "danger"
          )
        );
  };

  return (
    <>
      {newSearch ? (
        <ResultSearch
          messageLoading={messageLoading}
          loading={loading}
          messageErrorLoading={messageErrorLoading}
          filterResult={filterResult}
        />
      ) : (
        <Numbers persons={persons} handleDeletePerson={handleDeletePerson} />
      )}
    </>
  );
};

export default Persons;
