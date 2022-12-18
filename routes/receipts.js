const router = require("express").Router()

const {
  getMorningReceipts,
  getSimpleReceipts,
  getReceiptPoints,
  addReceipt
} = require('../data')

// GET
router.get("/:receiptId/points", async (req, res) => {
  const { receiptId } = req.params;

  if (!receiptId) {
    const error = new Error("No receipt found for that id");
    error.status = 404;
    throw error;
  }
  res.status(200);
});


router.get("/morning", async(req, res) => {
  const morningReceipts = await getMorningReceipts()
  res.send(morningReceipts);
});


router.get('/simple', async(req, res) => {
  const simpleReceipts = await getSimpleReceipts()
  res.send(simpleReceipts)
})


// POST
router.post("/process", async (req, res) => {
  const receipt = await addReceipt(req.body)
  res.send(receipt.id)
  // TAKES JSON
  // RETURN JSON obj "id": 8-4-4-4-12
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
