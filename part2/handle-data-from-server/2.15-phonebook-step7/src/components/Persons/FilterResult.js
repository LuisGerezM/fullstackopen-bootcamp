import React from "react";

const FilterResult = ({ filterResult }) => {
  return (
    <>
      {filterResult?.map((element) => (
        <p key={element.name}>
          <u>
            {element.name} - {element.number}
          </u>
        </p>
      ))}
    </>
  );
};

export default FilterResult;
