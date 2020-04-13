interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(dailyHours: Array<number>, target: number) {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
