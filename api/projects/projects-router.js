const express = require('express')

const {
    validateProjectId,
    validateProject,
    putValidateProject
} = require('./projects-middleware')

const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.proj)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert({ name: req.name, description: req.description, completed: req.completed})
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProjectId, putValidateProject, (req, res, next) => {
    Project.update(req.params.id, { name: req.name, description: req.description, completed: req.comp })
        .then(updatedProject => {
            res.json(updatedProject)
        })
        .catch(next)
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .catch(next)
})

router.get('/:id/actions', (req, res, next) => {
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