const express = require('express')
const app = express()
const receiptsRouter = require('./routes/receipts')

app.use(express.json())
app.use('/receipts', receiptsRouter);

app.get('/', (req, res) => {
    res.send("Hello!")
})

const port = 8000
app.listen(port, () => console.log(`Server is listening on port ${port}`))
