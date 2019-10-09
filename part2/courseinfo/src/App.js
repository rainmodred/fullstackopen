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
      {parts.map(({ name, exercises, id }) => {
        return <Part part={name} exercisesCount={exercises} key={id} />;
      })}
    </>
  );
}

function Total({ total }) {
  return <b>total of exercises {total}</b>;
}

function Course({ course }) {
  const total = course.parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  );
}

function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map(course => (
        <Course course={course} key={course.id} />
      ))}
    </div>
  );
}

export default App;
