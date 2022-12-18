const router = require("express").Router()

const { application } = require("express");
const {
  // getSimpleReceipts,
  addReceipt,
  getReceiptById,
  getPointsById,
  getAllReceipts
} = require('../data')

// GET
router.get("/:receiptId/points", (req, res) => {
  const { receiptId } = req.params;
  const receipt = getReceiptById(receiptId)
  const points = getPointsById(receiptId)

  if (receipt) {
    res.status(200);
    res.json({ points })
  } else {
    const error = new Error("No receipt found for that id");
    error.status = 404;
    throw error;
  }
});


router.get("/:receiptId", (req, res) => {
  const { receiptId } = req.params;
  const receipt = getReceiptById(receiptId)

  if (receipt) {
    res.status(200);
    res.json(receipt)
  } else {
    const error = new Error("No receipt found for that id");
    error.status = 404;
    throw error;
  }
});


router.get('/', async(req, res) => {
  const allReceipts = await getAllReceipts()
  res.send(allReceipts)
})


// POST
router.post("/process", async (req, res) => {
  const receipt = await addReceipt(req.body);
  res.status(201)
  res.json({ id: receipt.id });
});

module.exports = router;


// Fetch Request
// fetch("/receipts/process", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     retailer: "Store Name",
//     purchaseDate: "2022-12-01",
//     purchaseTime: "13:00",
//     total: "13.37",
//     items: [
//       {
//         shortDescription: "Item 1",
//         price: "10.00"
//       },
//       {
//         shortDescription: "Item 2",
//         price: "3.37"
//       },
//     ]
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));
