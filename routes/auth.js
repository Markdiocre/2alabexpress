var express = require('express');
var router = express.Router();

var {sqlConnect} = require('../services/mysql-service')

let table_name = "user"

router.post('/login', (req, res) => {
    //Step 1: Get all users with provided username or LIMIT 1
    //Step 2 : Check if row length >= 1
    //Step 3: Compare passwords
    // Step 4: If all is right, authenticate
    let connection = sqlConnect()
    connection.connect()

    connection.query(`SELECT * FROM ${table_name} WHERE username="${req.body.username}" LIMIT 1;`, (err, rows, fields) => {
        if (err) throw err
        if(rows.length <= 0) return res.status(404).send({message: "Username or password may be wrong"})
        if(rows[0].password !== req.body.password){
            return res.status(401).send({message: "Username or password may be wrong"})
        }

        return res.status(200).send({message: "Logged in!"})
    })

    connection.end()
})

module.exports = router;