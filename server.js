const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db = knex ({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root',
        database: 'smart-brain',
    },
});

// db.select('*').from('users').then(data => {
//     console.log(data)
// }) 
    // Starts an asynchronous operation (it talks to the database).
    // It doesn't immediately give you the data — instead, it returns a Promise.
    // use .then(...) to handle the result when the Promise is fulfilled.


const app = express()
app.use(express.json()) //body parser middleware to parse JSON data in the request body
app.use(cors()) 
// Cross-Origin Resource Sharing =>
// Telling your server: "Allow requests from different origins (different domains, ports, or protocols)


app.get('/', (req,res) => {
    res.send('success') 
    // It sends a response back to the client (like Postman or the browser)
})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req,res) => { image.handleImage(req, res, db)})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})


/*
signin => post = success/fail
register => post = user
profile/:userid => get = user
image => put => user
*/