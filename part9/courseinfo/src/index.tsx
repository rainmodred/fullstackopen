import React from 'react';
import ReactDOM from 'react-dom';

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{name}</h1>;
};

interface Parts {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<{ parts: Parts[] }> = ({ parts }) => {
  return (
    <>
      {parts.map(({ name, exerciseCount }, index) => {
        return (
          <p key={index}>
            {name} {exerciseCount}
          </p>
        );
      })}
    </>
  );
};

const Total: React.FC<{ total: number }> = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];
  const totalExercies = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName}>{courseName}</Header>
      <Content parts={courseParts}></Content>
      <Total total={totalExercies}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
