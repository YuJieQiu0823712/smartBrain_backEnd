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
    connection: process.env.DATABASE_URL

});



const app = express()
app.use(express.json()) //body parser middleware to parse JSON data in the request body
app.use(cors({
    origin: 'https://smartbrain-frontend-qmrt.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})) 

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
app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})


/*
signin => post = success/fail
register => post = user
profile/:userid => get = user
image => put => user
*/