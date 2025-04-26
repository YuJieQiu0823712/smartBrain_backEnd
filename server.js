const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const knex = require('knex')

const db = knex ({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        // port: 3306,
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


// app.use(express.urlencoded({extended: false}))
// // extended: false means it uses the Node.js built-in querystring module to parse the data, which only supports simple key-value pairs.
app.use(express.json()) //body parser middleware to parse JSON data in the request body
app.use(cors())

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }

//     ]
// }



app.get('/', (req,res) => {
    // console.log(req.query)
    // console.log(req.body)
    // console.log(req.headers)
    // console.log(req.params)
    // console.log(req.method)
    // res.send('this is working')
    // res.send(database.users)
    // res.status(404).send('not found')
        // It sends a response back to the client (like Postman or the browser)
       res.send('success') 
})

app.post('/signin', (req,res) => {
    // res.json('signing')
    // bcrypt.compare('apples', '$2b$10$T91v8OQ1AJcRKYV3QzUVoOc0WB5Q5qgUd9S/2xJ.zuI11pPxiU.N.', (err, res) => {
    //     console.log('first', res)   
    // });
    // bcrypt.compare('veggies', '$2b$10$T91v8OQ1AJcRKYV3QzUVoOc0WB5Q5qgUd9S/2xJ.zuI11pPxiU.N.', (err, res) => {
    //     console.log('second', res)   
    // });

    // if (req.body.email === database.users[0].email &&
    //     req.body.password === database.users[0].password) {
    //         // res.json('success')
    //         res.json(database.users[0])
    //     } else {
    //         res.status(400).json('error logging in')
    //     } 

    
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        if(isValid) {
            return db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get users'))
        } else {
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

    




app.post('/register', (req,res) => {
    const { email, name, password } = req.body
    // bcrypt.hash(password, 10, (err, hash) => {
    //     console.log(hash)   
    // });

    // database.users.push({
    //     id: '125',
    //     name: name,
    //     email: email,
    //     // password: password,
    //     entries: 0,
    //     joined: new Date()
    // })
    // res.json(database.users[database.users.length-1])

    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })

    // db('users')
    // .returning('*')
    // .insert({
    //     email: email,
    //     name: name,
    //     joined: new Date()
    // }).then(response => {
    //     res.json(response);
    // })

    .catch(err => res.status(404).json('unable to register'))
        // res is the response object from Express
        // .json() sends the err back to the client in JSON format
 
    
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params
    // let found = false
    
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true
    //         return res.json(user)
    //     } 
    // }) 


    // db.select('*').from('users').where({
    //     id: id
    // }) //equal
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
    // if (!found) {
    //     res.status(404).json('no such user')
    // }
        
})

app.put('/image', (req,res) => {
    const { id } = req.body
    // let found = false
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true
    //         user.entries++
    //         return res.json(user.entries)
    //     }
    // })

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))
    
    // if (!found) {
    //     res.status(404).json('not found')
    // }
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