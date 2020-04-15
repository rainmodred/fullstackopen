// interface BmiValues {
//   height: number;
//   weight: number;
// }

// function parseBmiArgs(args: Array<string>): BmiValues {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3]),
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }

export function calculateBmi(height: number, weight: number): string {
  const BMI = weight / (height / 100) ** 2;

  if (BMI < 18.5) return 'Underweight';
  if (BMI >= 18.5 && BMI <= 25) return 'Normal (healthy weight)';
  if (BMI > 25 && BMI <= 30) return 'Overweight ';
  if (BMI > 30) return 'Obese';

  throw new Error('Invalid values');
}

// try {
//   const { height, weight } = parseBmiArgs(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }
