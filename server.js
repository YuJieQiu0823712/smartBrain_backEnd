const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')

const app = express()


// app.use(express.urlencoded({extended: false}))
// // extended: false means it uses the Node.js built-in querystring module to parse the data, which only supports simple key-value pairs.
app.use(express.json()) //body parser middleware to parse JSON data in the request body
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }

    ]
}



app.get('/', (req,res) => {
    // console.log(req.query)
    // console.log(req.body)
    // console.log(req.headers)
    // console.log(req.params)
    // console.log(req.method)
    // res.send('this is working')
    res.send(database.users)
    // res.status(404).send('not found')
})

app.post('/signin', (req,res) => {
    // res.json('signing')
    // bcrypt.compare('apples', '$2b$10$T91v8OQ1AJcRKYV3QzUVoOc0WB5Q5qgUd9S/2xJ.zuI11pPxiU.N.', (err, res) => {
    //     console.log('first', res)   
    // });
    // bcrypt.compare('veggies', '$2b$10$T91v8OQ1AJcRKYV3QzUVoOc0WB5Q5qgUd9S/2xJ.zuI11pPxiU.N.', (err, res) => {
    //     console.log('second', res)   
    // });
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('success')
    } else {
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req,res) => {
    const { email, name, password } = req.body
    // bcrypt.hash(password, 10, (err, hash) => {
    //     console.log(hash)   
    // });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        // password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
    
})

app.get('/profile/:id', (req,res) => {
    const {id} = req.params
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            return res.json(user)
        } 
    }) 
    if (!found) {
        res.status(404).json('no such user')
    }
        
})

app.put('/image', (req,res) => {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(404).json('not found')
    }
})



app.listen(3000, () => {
    console.log('app is running on port 3000')
})


/*
signin => post = success/fail
register => post = user
profile/:userid => get = user
image => put => user
*/