import React, { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statics = (prop) => {
  const { type, good, neutral, bad } = prop;

  const allComents = () => {
    return good + neutral + bad;
  };

  const averageScore = () => {
    return (good + neutral + bad) / 3;
  };

  const porcentagePositive = () => {
    return (good * 100) / (good + neutral + bad);
  };

  let number;
  type === "all" && (number = allComents());
  type === "average" && (number = averageScore());
  type === "positive" && (number = porcentagePositive());

  return (
    <tr>
      <td>{type}</td>
      <td>{number}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(1);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const commentExist = () => good || neutral || bad > 0;

  return (
    <div>
      <h1>give feedback</h1>
      <button>good</button>
      <button>neutral</button>
      <button>bad</button>

      <h1>statics</h1>
      {commentExist() && (
        <>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <Statics type={"all"} good={good} neutral={neutral} bad={bad} />
              <Statics
                type={"average"}
                good={good}
                neutral={neutral}
                bad={bad}
              />
              <Statics
                type={"positive"}
                good={good}
                neutral={neutral}
                bad={bad}
              />
            </tbody>
          </table>
        </>
      )}
      {!commentExist() && "No feedback given"}
    </div>
  );
};

export default App;
