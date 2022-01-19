import React from "react";
import Part from "./Part";
import Total from "./Total";

const Course = ({ courses }) => {
  const { parts } = courses;

  return (
    <>
      <header>
        <h1>{courses.name}</h1>
      </header>
      <Part parts={parts} />
      <Total parts={parts} />
    </>
  );
};

export default Course;
