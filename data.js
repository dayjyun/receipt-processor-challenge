const morningReceipts = require("./examples/morning-receipt.json");
const simpleReceipts = require("./examples/simple-receipt.json");

const mnmReceipt = require("./examples/m&mexample.json");
const targetReceipt = require("./examples/target-example.json");

let nextReceiptId = 2;
function newReceipt(){
    const newId = nextReceiptId;
    nextReceiptId++;
    return newId;
}

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
    let date = receipt.purchaseDate,
        day = +date.slice(-2);

    if (day % 2 !== 0) {
      points += 6;
    }
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


// Alternative solution
function getPoints(receipt) {
  let points = 0;

// retailerNameLength
  points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;


// isRounded
  points += receipt.total % 1 === 0 ? 50 : 0;


// isMultipleOf25
  points += receipt.total % 0.25 === 0 ? 25 : 0;


// fiveForEveryTwo
  points += Math.floor(receipt.items.length / 2) * 5;


// isDescriptionLength3
  receipt.items
    .filter((item) => item.shortDescription.length % 3 === 0)
    .forEach((i) => (points += Math.ceil(i.price * 0.2)));


// isDateOdd
  points += receipt.purchaseDate.slice(-2) % 2 === 1 ? 6 : 0;


// between2And4
  points +=
    +receipt.purchaseTime.replace(':', '') > 1400 &&
    +receipt.purchaseTime.replace(':', '') < 1600
      ? 10
      : 0;


  return points;
}

getAllReceipts = () => {
    return Object.values(morningReceipts, simpleReceipts)
}


getMorningReceipts = () => {
  return Object.values(morningReceipts);
};


getSimpleReceipts = () => {
  return Object.values(simpleReceipts);
};


getReceiptPoints = (receiptId) => {
    const receipt = {...morningReceipts[receiptId]}
    receipt.points = calculatePoints(morningReceipts)
    return receipt.points
}


addReceipt = (data) => {
    const receiptId = newReceipt();
    data.receiptId = receiptId;

}

module.exports = {
  getAllReceipts,
  getMorningReceipts,
  getSimpleReceipts,
  getReceiptPoints,
  addReceipt,
};
