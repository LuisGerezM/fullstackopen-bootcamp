import React from "react";

const Filter = ({ handleSearchPerson }) => {
  return (
    <div>
      {" "}
      filter shown with <input name="search" onChange={handleSearchPerson} />
    </div>
  );
};

export default Filter;
