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

export default function Course({ course }) {
  const total = course.parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  );
}
