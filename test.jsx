// const http = require('http')
const express = require('express')



// const server = http.createServer((request, response) => {
//     console.log('method', request.method)
//     console.log('url', request.url)
//     const user = {
//         name: 'John Doe',
//         age: 30,
//     }
//     response.setHeader('Content-Type', 'application/json')
//     response.end(JSON.stringify(user))
// })

const app = express()

// Express middleware
// app.use((req, res, next) => {
//     console.log('<h1>hellooooo</h1>')
//     next()
// })

app.use(express.static(__dirname + '/public'))

// app.get('/', (req,res) => {
//     res.send('getting root')
// })

// app.get('/profile', (req,res) => {
//     res.send('getting profile')
// })

// app.post('/profile', (req,res) => {
//     const user={
//         name: 'John Doe',
//         age: 30,
//     }
//     res.send(user)
// })



// server.listen(3000)
app.listen(3000)