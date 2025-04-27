 const handleSignin = (req, res, db, bcrypt) => {
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
        // res is the response object from Express
        // .json() sends the err back to the client in JSON format
 }

module.exports = {
    handleSignin: handleSignin
}