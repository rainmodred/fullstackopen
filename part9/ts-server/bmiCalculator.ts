interface BmiValues {
  height: number;
  weight: number;
}

function parseArguments(args: Array<string>): BmiValues {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

function calculateBmi(height: number, weight: number): string {
  const BMI = weight / (height / 100) ** 2;

  if (BMI < 18.5) return 'Underweight';
  if (BMI >= 18.5 && BMI <= 25) return 'Normal (healthy weight)';
  if (BMI > 25 && BMI <= 30) return 'Overweight ';
  if (BMI > 30) return 'Obese';
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
