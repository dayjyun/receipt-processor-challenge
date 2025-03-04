const router = require("express").Router()
const {
  addReceipt,
  getReceiptById,
  getAllReceipts
} = require('../data')


// GET get points for receipt by ID
router.get("/:receiptId/points", (req, res, next) => {
  const { receiptId } = req.params;
  const receipt = getReceiptById(receiptId)

  if (receipt) {
    res.status(200);
    res.json({ points: receipt.points })
  } else {
    const error = new Error("No receipt found for that id");
    error.status = 404;
    return next(error)
  }
});


// Get receipt by ID
router.get("/:receiptId", (req, res, next) => {
  const { receiptId } = req.params;
  const receipt = getReceiptById(receiptId)

  if (receipt) {
    res.status(200);
    res.json(receipt)
  } else {
    const error = new Error("No receipt found for that id");
    error.status = 404;
    return next(error)
  }
});


// Display all receipts
router.get('/', async(req, res) => {
  const allReceipts = await getAllReceipts()
  res.send(allReceipts)
})


// POST new receipt
router.post("/process", async (req, res, next) => {
  const { retailer, purchaseDate, purchaseTime, total, items } = req.body;

  if(!retailer || !purchaseDate || !purchaseTime || !total || !items.length ){
    const error = new Error("The receipt is invalid");
    error.status = 400;
    return next(error)
  } else {
    const receipt = await addReceipt(req.body);
    res.status(200)
    res.json({ id: receipt.id });
  }
});

module.exports = router;
