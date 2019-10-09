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

function Content({ parts }) {
  return (
    <>
      {parts.map(({ name, exercises }) => {
        return <Part part={name} exercisesCount={exercises} key={name} />;
      })}
    </>
  );
}

function Total({ total }) {
  return <b>total of exercises {total}</b>;
}

function Course({ course, total }) {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  );
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
      {
        name: 'Redux',
        exercises: 11,
      },
    ],
  };

  const total = course.parts.reduce((prev, curr) => prev + curr.exercises, 0);

  return (
    <div>
      <Course course={course} total={total} />
    </div>
  );
}

export default App;
