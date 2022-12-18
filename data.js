const morningReceipts = require("./examples/morning-receipt.json");
const simpleReceipts = require("./examples/simple-receipt.json");

const mnmReceipt = require("./examples/m&mexample.json");
const targetReceipt = require("./examples/target-example.json");

exports.getMorningReceipts = () => {
  return Object.values(morningReceipts);
};

exports.getSimpleReceipts = () => {
  return Object.values(simpleReceipts);
};

function calculatePoints(receipt) {
  points = 0;


  function retailerNameLength(receipt) {
    let count = 0,
      regex = /^[a-zA-Z0-9]$/;

    for (let ch of receipt.retailer) {
      if (regex.test(ch)) {
        count++;
      }
    }
    points += count;
    // console.log("retailerNameLength", 6, points) // 6
  }


  function isRounded(receipt) {
    receipt.total % 1 === 0 ? (points += 50) : (points += 0);
  }


  function isMultipleOf25(receipt) {
    receipt.total % 0.25 === 0 ? (points += 25) : (points += 0);
  }


  function fiveForEveryTwo(receipt) {
    let halfItems = Math.floor(receipt.items.length / 2);
    points += halfItems * 5;
    // console.log("fiveForEveryTwo", 16, points)
  }


  function isDescriptionLength3(receipt) {
    for (let item of receipt.items) {
      if (item.shortDescription.length % 3 === 0) {
        points += Math.ceil(item.price * 0.2);
      }
    }
    // console.log("isDescriptionLength3", 19, points)
  }


  // Assuming date is YYYY-MM-DD
  function isDateOdd(receipt) {
    let date = receipt.purchaseDate,
        day = +date.slice(-2);

    if (day % 2 !== 0) {
      points += 6;
    }
    // console.log("isDateOdd", 25, points)
  }


  function between2And4(receipt) {
    let time = receipt.purchaseTime;
    time = +time.split(":").join('')

    if(time > 1400 && time < 1600){
        points += 10;
    }
  }

  retailerNameLength(receipt);
  isRounded(receipt);
  isMultipleOf25(receipt);
  fiveForEveryTwo(receipt);
  isDescriptionLength3(receipt);
  isDateOdd(receipt);
  between2And4(receipt);

  return points;
}

// console.log(calculatePoints(morningReceipts)) //=> 15
// console.log(calculatePoints(simpleReceipts)) //=> 31
// console.log(calculatePoints(mnmReceipt)); //=> 109
// console.log(calculatePoints(targetReceipt)); //=> 25


// Alternative solution
function getPoints(receipt) {
  let points = 0;

// retailerNameLength
  points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
    console.log(6, points)

// isRounded
  points += receipt.total % 1 === 0 ? 50 : 0;


// isMultipleOf25
  points += receipt.total % 0.25 === 0 ? 25 : 0;


// fiveForEveryTwo
  points += Math.floor(receipt.items.length / 2) * 5;
    console.log(16, points)

// isDescriptionLength3
  points += receipt.items.filter(item => {
    item.shortDescription.length % 3 === 0 ? Math.ceil(item.price * 0.2) : 0
  })
console.log(19, points);

// isDateOdd
  points += receipt.purchaseDate.slice(-2) % 2 === 1 ? 6 : 0;
console.log(25, points);

// between2And4
  points +=
    +receipt.purchaseTime.replace(':', '') > 1400 &&
    +receipt.purchaseTime.replace(':', '') < 1600
      ? 10
      : 0;


  return points;
}

// console.log(getPoints(morningReceipts)) //=> 15
// console.log(getPoints(simpleReceipts)) //=> 31
// console.log(getPoints(mnmReceipt)); //=> 109
console.log(getPoints(targetReceipt)); //=> 25
