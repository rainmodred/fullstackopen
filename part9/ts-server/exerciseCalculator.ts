interface ExerciseValues {
  target: number;
  dailyHours: Array<number>;
}

function parseArguments(args: Array<string>): ExerciseValues {
  const dailyHours: Array<number> = [];

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    } else {
      dailyHours.push(Number(args[i]));
    }
  }

  if (!isNaN(Number(args[2]))) {
    return {
      target: +args[2],
      dailyHours,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(target: number, dailyHours: Array<number>): Result {
  const trainingDays = dailyHours.filter((val) => val > 0).length;

  const totalHours = dailyHours.reduce(
    (acc: number, current: number) => acc + current,
    0
  );
  const average = totalHours / dailyHours.length;
  const success = average >= target ? true : false;
  let rating = 0;
  let diff = Math.abs(target - average);
  if (average < target) {
    rating = 1;
  } else if (diff > 0 && diff < 0.5) {
    rating = 2;
  } else if (diff >= 0.5) {
    rating = 3;
  }

  let ratingDescription = '';
  switch (rating) {
    case 1:
      ratingDescription = 'bad';
      break;
    case 2:
      ratingDescription = 'good';
      break;
    case 3:
      ratingDescription = 'excellent';
      break;
    default:
      break;
  }

  return {
    periodLength: dailyHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

try {
  const { target, dailyHours } = parseArguments(process.argv);
  console.log(calculateExercises(target, dailyHours));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
