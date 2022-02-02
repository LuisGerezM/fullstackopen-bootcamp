import React from "react";

const PersonForm = ({
  handleSubmitAddPerson,
  newName,
  newNumPhone,
  handleNameInput,
}) => {
  return (
    <form onSubmit={handleSubmitAddPerson}>
      <div>
        name: <input name="name" value={newName} onChange={handleNameInput} />
      </div>
      <br />
      <div>
        Number:{" "}
        <input name="number" value={newNumPhone} onChange={handleNameInput} />
      </div>
      <br />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
