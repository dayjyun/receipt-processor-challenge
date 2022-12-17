const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  res.send("receipts home");
});

// GET
router.get("/:receiptId/points", async (req, res) => {
  const { receiptId } = req.params;

  if (!receiptId) {
    const error = new Error("No receipt found for that id");
    error.status = 400;
    throw error;
  }
  res.status(200);
});

// POST
router.post("/process", async (req, res) => {});

module.exports = router;
