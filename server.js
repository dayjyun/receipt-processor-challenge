const express = require('express')
const app = express()
app.use(express.json())

const receiptsRouter = require('./routes/receipts')
app.use('/receipts', receiptsRouter);



const port = 8000
app.listen(port, () => console.log(`Server is listening on port ${port}`))
