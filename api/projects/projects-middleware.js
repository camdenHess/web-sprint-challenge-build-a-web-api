const Project = require('./projects-model')

const validateProjectId = (req, res, next) => {
    Project.get(req.params.id)
        .then(proj => {
            if (!proj) {
                next({status: 404, message: 'project not found'})
            } else {
                req.proj = proj
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'problem finding project'
            })
        })
}

const validateProject = (req, res, next) => {
    const { name, description, completed } = req.body
    if (!name || !description) {
        res.status(400).json({
            message: 'name and description are required'
        })
    } else {
        if(completed) {
            req.completed = completed
        }
        req.name = name
        req.description = description
        next()
    }
}

const putValidateProject = (req, res, next) => {
    const { name, description, completed } = req.body
    if (!name || !description || completed === undefined) {
        res.status(400).json({
            message: 'name, description, and completed are required'
        })
    } else {
        req.comp = completed
        req.name = name
        req.description = description
        next()
    }
}


module.exports = {
    validateProjectId,
    validateProject,
    putValidateProject
}