import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);

  // fill cambia todos los valores del arreglo a valores estaticos. en este caso genera una arreglo con la longitud de anedcotes [0,0,0,0,0,0]
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [existVote, setExistVote] = useState(false);

  const handleNextAnecdote = () =>
    setSelected(Math.trunc(Math.random() * (6 - 0) + 0));

  const handleVoteAnecdote = () => {
    // copio array original en nuevo array "point"
    const point = [...points];
    // sumo 1 a la anecdota votada
    point[selected] += 1;
    // guardo en array original "points" el nuevo array "point" pero modificado
    setPoints(point);
    setExistVote(true);
  };

  const fetchAnecdoteMostVotes = () => {
    let higher = 0;
    let indexHigher = 0;
    points.forEach((element, index) => {
      if (element > higher) {
        higher = element;
        indexHigher = index;
      }
    });

    return indexHigher;
  };

  return (
    <div>
      <div>
        <p>
          {" "}
          <strong>Anecdote of the day</strong>
        </p>
        <div>{anecdotes[selected]}</div>
        <br />
        <div>has {points[selected]} votes</div>
        <br />
        <Button handleClick={handleVoteAnecdote} text={"vote"} />
        <Button handleClick={handleNextAnecdote} text={"Next anecdote"} />
      </div>

      <br />
      {existVote && (
        <div>
          <p>
            {" "}
            <strong>Anecdote with most votes</strong>
          </p>
          <div>
            <div>{anecdotes[fetchAnecdoteMostVotes()]}</div>
          </div>
          <br />
          <div>has {points[fetchAnecdoteMostVotes()]} votes</div>
        </div>
      )}
    </div>
  );
};

export default App;
