'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services/index')

const signUp = (req, res) => {
    User.findOne({email: req.body.email},(err,usr)=>{
        if (err) res.status(500).send({message: `Error : ${err}`})
        if(!usr){
            const user = new User({
                email: req.body.email,
                displayName: req.body.displayName,
                password: req.body.password
            })
            user.save(err => {
                if(err) res.status(500).send({message: `Error al crear usuario error: ${err}`})
    
                return res.status(200).send({token: service.createToken(user)})
            })
        } else {
             return res.status(404).send({message: 'usuario ya existe', cod: 0})
        }
    })       
}
const signIn = (req, res) => {
    User.find({email: req.body.email},(err, user)=>{
        if(err) return res.status(500).send({message:`Error: ${err}`})
        if(!user) return res.status(404).send({message: `No existe el usuario`})

        req.user = user
        res.status(200).send({
            message: `Te has logeado correctamente`,
            token: service.createToken(user)               })
    })
}

const getUsers = (req, res) =>{
    User.find((err, user)=>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!user) return res.status(404).send({message: `No existen user`})
        return res.status(200).json(user)
    })
}

module.exports={
    signUp,
    signIn,
    getUsers
}