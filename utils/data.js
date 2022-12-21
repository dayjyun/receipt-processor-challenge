const simpleReceipts = require("../examples/simple-receipt.json");
const morningReceipt = require('../examples/morning-receipt.json')
const mmReceipt = require('../examples/m&m-receipt.json')
const targetReceipt = require('../examples/target-receipt.json')

let receiptsArr = [simpleReceipts, morningReceipt, mmReceipt, targetReceipt]

// Add Ids to each receipt
function idGenerator(){
    let id = "";
    let char = "abcdefghijklmonpqrstuvwxyz0123456789";

    for (let i = 0; i < 32; i++) {
      id += char.charAt(Math.floor(Math.random() * 36));

      if (i === 7 || i === 11 || i === 15 || i === 19) {
        id += "-";
      }
    }

    return id;
}

// Generate ID and Points if undefined
for(let i = 0; i < receiptsArr.length; i++){
  let receipt = receiptsArr[i]
  if(receipt.id === undefined){
    receipt.id = idGenerator()
  }
  if(receipt.points === undefined){
    receipt.points = calculatePoints(receipt)
    // receipt.points = getPoints(receipt) // Alternative
  }
}


// Method 1
function calculatePoints(receipt) {
  points = 0;

  // One point per alphanumeric char
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


  // 50 points if dollar amount is rounded
  function isRounded(receipt) {
    receipt.total % 1 === 0 ? (points += 50) : (points += 0);
  }


  // 25 points if total is multiple of .25
  function isMultipleOf25(receipt) {
    receipt.total % 0.25 === 0 ? (points += 25) : (points += 0);
  }


  // 5 points for every 2 items on receipt
  function fiveForEveryTwo(receipt) {
    let halfItems = Math.floor(receipt.items.length / 2);
    points += halfItems * 5;
  }


  // Check if length is divisible by 3
  function isDescriptionLength3(receipt) {
    for (let item of receipt.items) {
      if (item.shortDescription.length % 3 === 0) {
        points += Math.ceil(item.price * 0.2);
      }
    }
  }


  // 6 points if purchase date is odd
  // Assuming date is YYYY-MM-DD
  function isDateOdd(receipt) {
    let date = receipt.purchaseDate,
        day = +date.slice(-2);

    if (day % 2 !== 0) {
      points += 6;
    }
  }


  // 10 points if purchase is between hours 2PM and 4PM
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


// Method 2 (Alternative)
// function getPoints(receipt) {
//   let points = 0;

// // retailerNameLength
//   points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;

// // isRounded
//   points += receipt.total % 1 === 0 ? 50 : 0;

// // isMultipleOf25
//   points += receipt.total % 0.25 === 0 ? 25 : 0;

// // fiveForEveryTwo
//   points += Math.floor(receipt.items.length / 2) * 5;

// // isDescriptionLength3
//   receipt.items
//     .filter((item) => item.shortDescription.length % 3 === 0)
//     .forEach((i) => (points += Math.ceil(i.price * 0.2)));

// // isDateOdd
//   points += receipt.purchaseDate.slice(-2) % 2 === 1 ? 6 : 0;

// // between2And4
//   points +=
//     +receipt.purchaseTime.replace(':', '') > 1400 &&
//     +receipt.purchaseTime.replace(':', '') < 1600
//       ? 10
//       : 0;

//   return points;
// }


let getReceiptById = id => {
  for(let receipt of receiptsArr){
    if(receipt.id === id){
      return receipt;
    }
  }
}


let getAllReceipts = () => {
  return receiptsArr;
}


let addReceipt = (receipt) => {
  let id = idGenerator();
  let points = calculatePoints(receipt)
  // let points = getPoints(receipt) // Alternative
  let newReceipt = { ...receipt, id, points };
  receiptsArr.push(newReceipt);
  return newReceipt;
};

module.exports = {
  getAllReceipts,
  addReceipt,
  getReceiptById,
};
