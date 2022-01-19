import React from "react";

const Part = ({ parts }) => {
  return (
    <>
      {parts.map((element) => (
        <div key={element.id}>
          <p>
            {element.name} {element.exercises}{" "}
          </p>
        </div>
      ))}
    </>
  );
};

export default Part;
