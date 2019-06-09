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

User = mongoose.model('User', UserSchema)

init = function(){

    var timeout = 15000;
    console.log('--> Timeout = ' + timeout)
    
    setTimeout(function(){
        
        console.log('--> DB_PATH = ' + DB_PATH)

        console.log('--> Connecting to database...')
        
        mongoose.connect(DB_PATH, {useNewUrlParser: true}).then(
        () => { 
            console.log('--> Connecting to database -> Success') 
            User.find().countDocuments(
                (err, count) => {
                    if (err){
                        res.sendStatus(500)
                        return console.error(err)
                    }
                    console.log('user\'s count: ' + count)
                }
            )
        },
        err => { return console.error(err) }
        )
    }, timeout)

}

createUser = function(login, password){
    //console.log('--> create user with login = ' + login + ', password = ' + password)
    return User.create({
        login: login,
        password: password
    })
}

module.exports = {
    User,
    init,
    createUser
}