const express = require('express')
const app = express()

const receiptsRouter = require('./routes/receipts')

// app.use(express.json())
app.use('/receipts', receiptsRouter);

app.listen(8000)
