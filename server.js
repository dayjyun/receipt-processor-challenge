const express = require('express')
const app = express()
const receiptsRouter = require('./routes/receipts')

app.use(express.json())
app.use('/receipts', receiptsRouter);

// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || "Server Error"
        }
    })
})


app.get('/', (req, res) => {
    res.send("Hello!")
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is listening on port ${port}`))
