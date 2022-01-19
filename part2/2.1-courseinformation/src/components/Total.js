import React from "react";

const Total = ({ parts }) => {
  // con reduce vamos a sumar la cantidad de ejercicios;
  const sumTotal = parts.reduce((acumulate, item) => (acumulate += item.exercises), 0);
  //   const sumTotal = parts.reduce((acumulate, item) => {
  //     // console.log('what is happening', acumulate, item)
  //     return (acumulate += item.exercises);
  //   }, 0);
  return (
    <>
      <p>
        <strong>Total of {sumTotal} excercises </strong>
      </p>
    </>
  );
};

export default Total;
