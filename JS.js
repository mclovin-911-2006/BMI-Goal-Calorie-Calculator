const form = document.getElementById('calcForm');
const result = document.getElementById('result');
const output = document.getElementById('output');
const back = document.getElementById('back');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const weight = parseFloat(form.weight.value);
  const height = parseFloat(form.height.value) / 100;
  const gender = form.gender.value;
  const age = parseInt(form.age.value);
  const target_weight = parseFloat(form.target_weight.value);
  const weeks = parseInt(form.weeks.value);

  if(weight <= 0 || height <= 0 || target_weight <= 0 || weeks <= 0){
    alert('Enter reasonable positive values');
    return;
  }

  const bmi = (weight / (height * height)).toFixed(2);
  let category = '';
  if(bmi < 18.5) category = 'Underweight';
  else if(bmi < 25) category = 'Normal weight';
  else if(bmi < 30) category = 'Overweight';
  else category = 'Obese';

  let bmr;
  if(gender === 'male') bmr = 88.36 + (13.4 * weight) + (4.8 * height*100) - (5.7 * age);
  else bmr = 447.6 + (9.2 * weight) + (3.1 * height*100) - (4.3 * age);

  const tdee = Math.round(bmr * 1.55);
  const weight_diff = target_weight - weight;
  const total_calories = weight_diff * 7700;
  const daily_calorie_change = Math.round(total_calories / (weeks * 7));
  const recommended_calories = tdee + daily_calorie_change;

  let note = '';
  if(recommended_calories < 1200) note = 'Calories too low to be safe';
  else if(recommended_calories > 4000) note = 'Calories too high to be safe';
  else note = 'Plan looks reasonable';

  output.innerHTML = `
    <p><strong>BMI:</strong> ${bmi}</p>
    <p><strong>Category:</strong> ${category}</p>
    <p><strong>Daily calories to maintain (TDEE):</strong> ${tdee} kcal</p>
    <p><strong>Daily calories recommended:</strong> ${recommended_calories} kcal</p>
    <p><strong>Daily calorie change:</strong> ${daily_calorie_change} kcal</p>
    <p><strong>Notes:</strong> ${note}</p>
  `;
  form.hidden = true;
  result.hidden = false;
});

back.addEventListener('click', () => {
  form.hidden = false;
  result.hidden = true;
  form.reset();
});


