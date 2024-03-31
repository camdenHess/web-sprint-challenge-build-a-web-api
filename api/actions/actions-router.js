const express = require('express')

const { validateActionsId, validateAction, putValidateAction } = require('./actions-middlware')

const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionsId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert({project_id: req.project_id, description: req.description, notes: req.notes, completed: req.completed})
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', validateActionsId, putValidateAction, (req, res, next) => {
    console.log(req.comp, req.project_id, req.description, req.notes)
    Action.update(req.params.id, { project_id: req.project_id, description: req.description, notes: req.notes, completed: req.comp })
        .then(updatedAction => {
            res.json(updatedAction)
        })
        .catch(next)
})

router.delete('/:id', validateActionsId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: 'successfully deleted action'
            })
        })
        .catch(next)
})


router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something went wrong',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router