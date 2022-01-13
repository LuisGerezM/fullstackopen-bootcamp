const Header = ({ course }) => <h1>{course.name}</h1>;
const Content = (props) => {
  // const { part1, part2, part3, exercises1, exercises2, exercises3 } = props;
  const {
    course: { parts },
  } = props;
  console.log("parts", parts);
  return (
    <>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </>
  );
  // return (
  //   <>
  //     <Part part={part1} exercises={exercises1} />
  //     <Part part={part2} exercises={exercises2} />
  //     <Part part={part3} exercises={exercises3} />
  //   </>
  // );
};

const Total = ({course:{parts}}) => (

  <p>
    Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises }
  </p>
);

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

function App() {
  // const course = "Half Stack application development";
  // const part1 = "Fundamentals of React";
  // const exercises1 = 10;
  // const part2 = "Using props to pass data";
  // const exercises2 = 7;
  // const part3 = "State of a component";
  // const exercises3 = 14;

  // const course = 'Half Stack application development'
  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

  // const course = 'Half Stack application development'
  // const parts = [
  //   {
  //     name: 'Fundamentals of React',
  //     exercises: 10
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercises: 7
  //   },
  //   {
  //     name: 'State of a component',
  //     exercises: 14
  //   }
  // ]

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content
        // part1={part1}
        // part2={part2}
        // part3={part3}
        // exercises1={exercises1}
        // exercises2={exercises2}
        // exercises3={exercises3}

        // parts={parts}
        course={course}
      />

      <Total
        // exercises1={exercises1}
        // exercises2={exercises2}
        // exercises3={exercises3}

        //parts={parts}
        course={course}
      />
    </div>
  );
}

export default App;
