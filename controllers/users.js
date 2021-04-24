const User = require('../models/users')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')


module.exports = {

    createUser: (req, res) => {

        let { name, email, password, phone, address } = req.body
        let hash = bcrypt.hashSync(password, 10) // synchronous hashing
        let userInfo = new User({
            name,
            email,
            password: hash,
            phone,
            address
        })

        // error show
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) {
            return res.status(404).send({
                message: errors.formatWith(formatter).mapped(),
            });
        }

        User.findOne({ email: email }).exec()
            .then(user => {
                if (user) {
                    res.status(201).json({
                        message: "Email address already in use"
                    })
                } else {
                    userInfo.save()
                        .then(user => {

                            res.status(201).json({
                                user
                            })
                        })

                }
            }).catch(err => {
                res.status(500).json({
                    "message": err.message || "Some error occurred while user creating",
                })
            })
    },

    logIn: (req, res) => {
        let { email, password } = req.body

        User.findOne({ email: email }).exec()
            .then(user => {
                console.log(user)
                if (user) {
                    const secret_key = process.env.ACCESS_TOKEN_SECRET
                    const userInfo = {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                        "address": user.address,
                        "phone": user.phone
                    }

                    if (bcrypt.compareSync(password, user.password)) {
                        const token = jwt.sign(userInfo, secret_key)
                        return res.status(200).json({
                            "message": "login success",
                            "token": "Bearer " + token
                        })
                    } else {
                        return res.status(401).json({
                            "message": "Password did't matches"
                        })
                    }
                } else {
                    return res.status(401).json({
                        "message": "Email address not found"
                    })
                }
            }).catch(error => {
                return res.status(400).json({ error })
            })
    },

}