import React from "react";

const Numbers = ({ persons, handleDeletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons?.map((element) => (
        <li className="persons" key={element.name}>
          {element.name} {element.number}
          <button
            onClick={() => handleDeletePerson(element)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </li>
      ))}
    </>
  );
};

export default Numbers;
