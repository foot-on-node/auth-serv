require('dotenv').config()

const bodyParser = require('body-parser')

const express = require('express')
const database = require('./database')
const app = express()

const bcrypt = require('bcrypt')

const salt = 10

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

database.init()

app.listen(process.env.SERVER_PORT, function(){
    console.log('Listening on port ' + process.env.SERVER_PORT + '...')
})

app.post('/signup', function(req, res){
    var login = req.body.login
    var password = req.body.password
    
    console.log('try to signup user with login -> ' + login + ' and password -> ' + password)
    
    User.findOne({login: login}).exec(function(err, user){
        if (err){
            res.sendStatus(500)
            return console.error(err)
        }
        if (user){
            //console.log('--> Already exist')
            res.send('Already exist')
        }else{
            bcrypt.hash(password, salt).then(function(hash){
                database.createUser(login, hash).then(
                    result => {
                        //console.log('--> New')
                        res.send('Created')
                    },
                    error => {
                        res.sendStatus(500)
                        return console.error(error)
                    }
                )
            })
        }
    })
    
})

app.post('/auth', function(req, res){
    var login = req.body.login
    var password = req.body.password
    
    console.log('try to auth user with login -> ' + login + ' and password -> ' + password)
    
    User.findOne({login: login}).select('password').exec(function(err, user){
        if (err){
            res.sendStatus(500)
            return console.error(err)
        }
        if (user){
            bcrypt.compare(password, user.password).then(function(valid){
                if (valid){
                    console.log('--> Welcome')
                    res.send(true)
                }else{
                    console.log('--> Not compare')
                    res.send(false)
                }
            })
        }else{
            console.log('--> Not exist')
            res.send(false)
        }
    })
    
})