import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!isNaN(parseInt(height)) && !isNaN(parseInt(weight))) {
    const bmi = calculateBmi(parseInt(height), parseInt(weight));
    res.json({ weight, height, bmi });
  } else {
    res.status(400).send({
      error: 'malformatted parameters',
    });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body;

  if (!isNaN(Number(target)) && dailyExercises.length > 0) {
    const exercisesResult = calculateExercises(target, dailyExercises);
    res.json(exercisesResult);
  } else {
    res.status(400).send({
      error: 'malformatted parameters',
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
