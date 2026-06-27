const express = require('express');
const app = express()
const port = 3000
const authRoute = require('./routes/authRoute')
const categoryRoute = require('./routes/categoryRoute')

app.use(express.json())
app.use('auth/', authRoute)
app.use(categoryRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})