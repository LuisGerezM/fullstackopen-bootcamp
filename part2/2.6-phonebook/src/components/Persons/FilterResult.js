import React from "react";

const FilterResult = ({ filterResult }) => {
  return (
    <>
      {/* // filterResult.length !== 0 && filterResult.map((element)=>(
    //   <p key={element.id}><u>{element.name} - {element.number}</u></p>
    // ))
    // AMBAS chequean que tenga algún elemento para iterar, sino NO hace nada. con el '?' ya consulto su existencia */}
      {filterResult?.map((element) => (
        <p key={element.id}>
          <u>
            {element.name} - {element.number}
          </u>
        </p>
      ))}
    </>
  );
};

export default FilterResult;
