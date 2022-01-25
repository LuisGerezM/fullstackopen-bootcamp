import React from "react";

const Numbers = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons?.map((element) => (
        <p key={element.name}>
          {element.name} {element.number}{" "}
        </p>
      ))}
    </>
  );
};

export default Numbers;
