import React from 'react';

function Header({ course }) {
  return <h1>{course}</h1>;
}

function Part({ part, exercisesCount }) {
  return (
    <p>
      {part} {exercisesCount}
    </p>
  );
}

function Content({ content }) {
  return (
    <>
      {content.map(({ part, exercisesCount }) => {
        return <Part part={part} exercisesCount={exercisesCount} />;
      })}
    </>
  );
}

function Total({ total }) {
  return <p>Number of exercises {total}</p>;
}

function App() {
  const course = 'Half Stack application development';
  const content = [
    { part: 'Fundamentals of React', exercisesCount: 10 },
    { part: 'Using props to pass data', exercisesCount: 7 },
    { part: 'State of a component', exercisesCount: 14 },
  ];

  const total = content.reduce((prev, curr, indx, array) => {
    return prev + curr.exercisesCount;
  }, 0);

  return (
    <>
      <Header course={course} />
      <Content content={content} />
      <Total total={total} />
    </>
  );
}

export default App;
