const { check } = require('express-validator')

module.exports = {

    userValidator: [
        check('name')
        .not()
        .isEmpty()
        .withMessage('Name must be required')
        .isString()
        .withMessage('Name Must be string')
        .isLength({ min: 3 })
        .withMessage('Must be more then 3 letters'),

        check('email')
        .not()
        .isEmpty()
        .withMessage('Email must be required')
        .isEmail()
        .withMessage('Must be well formated email'),

        check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isString()
        .withMessage('Must be String')
        .isLength({ min: 8 })
        .withMessage('Minimum length should be 8'),

        check('phone')
        .not()
        .isEmpty()
        .withMessage('Phone number required')
        .isNumeric()
        .withMessage('Must be numeric')
        .isLength({ min: 8, max: 14 })
        .withMessage('Length should be 8 to 14 characters'),

        check('address')
        .not()
        .isEmpty()
        .withMessage('Address must be required')
        .isString()
        .withMessage('Address Must be string')
        .isLength({ min: 3 })
        .withMessage('Must be more then 3 letters'),

    ]

}