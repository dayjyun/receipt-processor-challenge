const router = require("express").Router()

const {
  getMorningReceipts,
  getSimpleReceipts,
  getReceiptPoints
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
router.post("/process", async (req, res) => {});

module.exports = router;
