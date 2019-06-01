require('dotenv').config()

const mongoose = require('mongoose')

const DB_PATH = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME

const UserSchema = mongoose.Schema({
    login: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

User = exports.User = mongoose.model('User', UserSchema)

exports.init = function(){

    console.log('--> DB_PATH = ' + DB_PATH)

    console.log('--> Connecting to database...')

    mongoose.connect(DB_PATH, {useNewUrlParser: true}).then(
        () => { 
            console.log('--> Connecting to database -> Success') 
            User.find({}).countDocuments(function(err, count){
                if (err){
                    res.sendStatus(500)
                    return console.error(err)
                }
                console.log('user\'s count: ' + count)
            })
        },
        err => { return console.error(err) }
    )

}

exports.createUser = function(login, password){
    //console.log('--> create user with login = ' + login + ', password = ' + password)
    return new Promise((resolve, reject) => {
        new User({
            login: login,
            password: password
        }).save(function(err){
            if (err){
                //console.log('--> has error')
                return reject(err)
            }
            //console.log('--> Saving entity with login [' + login + '] to database -> Success')
            return resolve()
        })
    })
}