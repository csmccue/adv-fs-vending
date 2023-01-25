const process = require('process');
const currency = require('./currency.json');
// import { currency } from './currency.json';
// console.log('argv', process.argv);


let itemCostInput = null;
let paymentInput = null;
let selectedCurrency = null;

for(let i = 0; i < process.argv.length; ++i) {
  const arg = process.argv[i];
  if(arg === '--USD') {
    selectedCurrency = currency.USD;
  }
  if(arg === '--AUD') {
    selectedCurrency = currency.AUD;
  }
  if(arg === '--item-cost') {
    itemCostInput = process.argv[i+1];
    // Skip the next element since we consumed it above.
    ++i;
  } else if(arg === '--payment') {
    paymentInput = process.argv[i+1];
    // Skip the next element since we consumed it above.
    ++i;
  }
}
if(itemCostInput == null) {
  console.error('--item-cost must be provided');
  process.exit(1);
}

const itemCost = Number(itemCostInput) * 100;
if(isNaN(itemCost)) {
  console.log('--item-cost must be a number');
  process.exit(1);
}

if(paymentInput == null) {
  console.error('--payment must be provided');
  process.exit(1);
}

const payment = Number(paymentInput) * 100;
if(isNaN(payment)) {
  console.log('--payment must be a number');
  process.exit(1);
}

// simple answer
// const change = payment - itemCost;
// if (change < 0 ) {
//   console.log('not enough money')
//   process.exit(1);
// } else {
//   let quarters;
//   let dimes;
//   let nickels;
//   let pennies;
//   quarters = Math.floor(change/25);
//   changeQ = change % 25;

//   dimes = Math.floor(changeQ/10);
//   changeD = changeQ % 10;

//   nickels = Math.floor(changeD/5);
//   changeN = changeD % 5;

//   pennies = Math.floor(changeN);

//   console.log('Quarters: ', quarters)
//   console.log('Dimes: ', dimes)
//   console.log('Nickels: ', nickels)
//   console.log('Pennies: ', pennies)
//   console.log('Total Change: ', change)
//   process.exit(1);
// }

// complicated answer

const change = payment - itemCost;
let output = '';
let newChange = change;
let count;
if (change < 0 ) {
  console.log('not enough money')
  process.exit(1);
} else {
  for (i = 0; i < selectedCurrency.coins.length; i++) {
    count = Math.floor(newChange / selectedCurrency.coins[i].value)
    newChange = newChange - count * selectedCurrency.coins[i].value;
    output += selectedCurrency.coins[i].name + 's: ' + count + ' ';
  }
  console.log(output);
  process.exit(1);
}

// hello there