const express = require('express');
const app = express()
const port = 3000
const authRoute = require('./routes/authRoute')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')

app.use(express.json())
app.use('auth/', authRoute)
app.use(categoryRoute)
app.use(productRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})