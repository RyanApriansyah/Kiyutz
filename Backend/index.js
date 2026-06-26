const express = require('express');
const app = express()
const port = 3000
const authRoute = require('./routes/authRoute')

app.use(express.json())
app.use(authRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})