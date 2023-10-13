
const rateEl = document.getElementById("rate");
const swapEl = document.getElementById("swap");
const currencyOneEl = document.getElementById("currency-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountOneEl = document.getElementById("amount-one");
const amountTwoEl = document.getElementById("amount-two");
const ccv = document.querySelector('.ccv')
// console.log(rateE1);
console.log(swapEl);
// console.log(currencyOneE1);
// console.log(currencyTwoE1);
// console.log(amountOneE1);
// console.log(amountTwoE1);
let currencyTwoRates = {};

const getData = () => {
  const currencyOne = currencyOneEl.value;
  const currencyTwo = currencyTwoEl.value;

  fetch(
    https//v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}
  )
    // ${currencyOne} если вместо USD ${} пишем то изменяется все//)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // const conversion_rates = data.conversion_rates
      // const {conversion_rates} = data;
      // const rates = conversion_rates[currencyTwo];
      // amountTwoE1.value = (+amountOneE1.value * rates).toFixed(2);
      const { conversion_rates } = data;
      ccv.innerText = '1USD=EUR'+conversion_rates['EUR']
      currencyTwoRates = { ...conversion_rates };
      calculateRates(conversion_rates, currencyTwo);
    });
};

const calculateRates = (data, currencyTwo) => {
  const rates = data[currencyTwo];
  amountTwoEl.value = (+amountOneEl.value * rates).toFixed(2);
};

const onCalculate = () => {
  calculateRates(currencyTwoRates, currencyTwoEl.value);
};

getData();

function swapFunc() {
  const val1 = currencyOneEl.value;
  const val2 = currencyTwoEl.value;
  currencyTwoEl.value = val1;
  currencyOneEl.value = val2;
  const valAm = amountOneEl.value;
  const valAm2 = amountTwoEl.value;
  amountOneEl.value = valAm2;
  amountTwoEl.value = valAm;

}


swapEl.addEventListener("click", swapFunc);
amountOneEl.addEventListener("input", onCalculate);
currencyOneEl.addEventListener("change", getData);
currencyTwoEl.addEventListener("change", getData);