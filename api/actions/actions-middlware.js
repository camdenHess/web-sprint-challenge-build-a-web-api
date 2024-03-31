const Action = require('./actions-model')

const validateActionsId = (req, res, next) => {
    Action.get(req.params.id)
        .then(action => {
            if (!action) {
                next({status: 404, message: 'action not found'})
            } else {
                req.action = action
                next()
            }
        })
        .catch(() => {
            res.status(500).json({
                message: 'problem finding action'
            })
        })
}

const validateAction = (req, res, next) => {
    const { project_id, description, notes, completed } = req.body
    if (!project_id || !description || !notes) {
        next({status: 400, message: 'project_id, description, and notes are required'})
    } else {
        if (completed) {
            req.completed = completed
        }
        req.project_id = project_id
        req.description = description
        req.notes = notes
        next()
    }
}

const putValidateAction = (req, res, next) => {
    const { project_id, description, notes, completed } = req.body
    if (!project_id || !description || !notes || completed === undefined) {
        next({status: 400, message: 'project_id, description, notes, and completed are required'})
    } else {
        req.comp = completed
        req.project_id = project_id
        req.description = description
        req.notes = notes
        next()
    }
}

module.exports = {
    validateActionsId,
    validateAction,
    putValidateAction
}