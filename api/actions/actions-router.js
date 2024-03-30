const express = require('express')

//middleware

const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log(req)
})

router.get('/:id', (req, res, next) => {
    console.log(req)
})

router.post('/', (req, res, next) => {
    console.log(req)
})

router.put('/:id', (req, res, next) => {
    console.log(req)
})

router.delete('/:id', (req, res, next) => {
    console.log(req)
})


router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something went wrong',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router