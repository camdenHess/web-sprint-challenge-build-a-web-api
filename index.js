require('dotenv').config()
const express = require('express')

const server = express()

const PORT = process.env.PORT || 9000

server.use(express.json())



server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})