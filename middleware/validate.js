const validator = require('../helpers/validate');

const saveWorkout = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        muslce: 'required|string',
        type: 'required|string',
        times: 'required|string',
        days: 'required|string',
        sets: 'required|string',
        explination: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveWorkout
};