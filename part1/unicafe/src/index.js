import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Button({ onClick, value }) {
  return <button onClick={onClick}>{value}</button>;
}

function Statistic({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}%</td>
    </tr>
  );
}

function Staticstics({ good, neutral, bad }) {
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;

  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </tbody>
    </table>
  );
}

function App() {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} value={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} value={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} value={'bad'} />
      <h2>statistics</h2>
      <Staticstics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
