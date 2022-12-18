const morningReceipts = require("./examples/morning-receipt.json");
const simpleReceipts = require("./examples/simple-receipt.json");

const mnmReceipt = require('./examples/m&mexample.json')
const targetReceipt = require('./examples/target-example.json')

exports.getMorningReceipts = () => {
  return Object.values(morningReceipts);
};

exports.getSimpleReceipts = () => {
  return Object.values(simpleReceipts);
};

function calculatePoints(receipt) {
  points = 0;

  function retailerNamePoints(receipt) {
    let count = 0,
        regex = /^[a-zA-Z0-9]$/;

    for(let ch of receipt.retailer){
        if(regex.test(ch)){
            count++
        }
    }
    points += count;
  }

  function isRoundDollarAmount(receipt) {
    receipt.total % 1 === 0 ? (points += 50) : (points += 0);
}

function isMultipleOf25(receipt) {
    receipt.total % 0.25 === 0 ? (points += 25) : (points += 0);
}

function fiveForEveryTwo(receipt) {
    let halfItems = Math.floor(receipt.items.length / 2);
    points += halfItems * 5;
}

function isDescriptionLength3(receipt) {
    for (let item of receipt.items) {
        if (item.shortDescription.length % 3 === 0) {
            points += Math.ceil(item.price * 0.2);
        }
    }
  }

  // Assuming date is YYYY-MM-DD
  function isDateOdd(receipt) {
    let date = receipt.purchaseDate;
    let day = date.slice(-2);
    if (+day % 2 !== 0) {
      points += 6;
    }
  }

  function between2And4(receipt) {
    let time = receipt.purchaseTime;
    let hour = +time.slice(0, 2);
    if (hour > 14 && hour < 16) {
      points += 10;
    }
  }

  retailerNamePoints(receipt);
  isRoundDollarAmount(receipt);
  isMultipleOf25(receipt);
  fiveForEveryTwo(receipt);
  isDescriptionLength3(receipt);
  isDateOdd(receipt);
  between2And4(receipt);

  return points;
}

console.log(calculatePoints(mnmReceipt)) //=> 109/102
console.log(calculatePoints(targetReceipt)) //=> 25/25

// function getPoints(receipt) {
//   let points = 0;

// retailerNamePoints
//   points += receipt.retailer.length;

// isRoundDollarAmount
//   points += receipt.total % 1 === 0 ? 50 : 0;

// isMultipleOf25
//   points += receipt.total % 0.25 === 0 ? 25 : 0;

// fiveForEveryTwo
//   points += Math.floor(receipt.items.length / 2) * 5;

// isDescriptionLength
//   points += receipt.items.reduce((acc, item) => {
//     acc += item.description.length % 3 === 0 ? Math.ceil(item.price * 0.2) : 0;
//     return acc;
//   }, 0);

// isDateOdd
//   points += receipt.date.getDate() % 2 === 1 ? 6 : 0;

// between2And4
//   points +=
//     receipt.time.getHours() > 14 && receipt.time.getHours() < 16 ? 10 : 0;
//   return points;
// }
