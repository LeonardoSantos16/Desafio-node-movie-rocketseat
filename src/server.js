const express = require('express')
const routes = require('./routes')
const app = express()
app.use(express.json())
app.use(routes)

const PORT = 777
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))