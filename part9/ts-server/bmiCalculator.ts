function calculateBmi(height: number, weight: number): string {
  const BMI = weight / (height / 100) ** 2;
  console.log(BMI);
  if (BMI < 18.5) return 'underweight';
  if (BMI >= 18.5 && BMI <= 25) return 'Normal (healthy weight)';
  if (BMI > 25 && BMI <= 30) return 'overweight ';
  if (BMI > 30) return 'obese';
}

console.log(calculateBmi(180, 74));
