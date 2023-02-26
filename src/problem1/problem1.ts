function counts(n) {
  let counter = 0;
  let sum = 0;
  while (counter <= n) {
    sum = counter + sum;
    counter++;
  }

  return sum;
}

function counts2(n) {
  let sum = 0;
  for (let counter = 1; counter <= n; counter++) {
    sum += counter;
  }
  return sum;
}

function counts3(n) {
  return (n * (n + 1)) / 2;
}

var sum_to_n_a = counts(10);

var sum_to_n_b = counts2(10);

var sum_to_n_c = counts3(10);

console.log(sum_to_n_a);
console.log(sum_to_n_b);
console.log(sum_to_n_c);
