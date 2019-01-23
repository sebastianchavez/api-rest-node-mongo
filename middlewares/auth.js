'use strict'
const services = require('../services')

const isAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({message: `No tienes autorizacion`})
    }
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[0]
    console.log(token);
    
    services.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status).send(response)
        })
}

module.exports = isAuth