var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

var {sqlConnect} = require('../services/mysql-service')

let table_name = "user"

router.post('/login', async (req, res) => {
    let connection = sqlConnect()
    connection.connect()

    connection.query(`SELECT * FROM ${table_name} WHERE username="${req.body.username}" LIMIT 1;`, async (err, rows, fields) => {
        if (err) throw err
        if(rows.length <= 0) return res.status(404).send({message: "Username or password may be wrong"})
        let comparison = await bcrypt.compare(req.body.password, rows[0].password)
        if(!comparison){
            return res.status(401).send({message: "Username or password may be wrong"})
        }

        return res.status(200).send({message: "Logged in!"})
    })

    connection.end()
})

router.post('/register',async (req, res)=>{
    let connection = sqlConnect()
    connection.connect()

    let {name, username, password} = req.body

    let encryptedPassword = await bcrypt.hash(password, 10)

    connection.query(`INSERT INTO ${table_name}(name,username,password) VALUES('${name}','${username}','${encryptedPassword}');`, (err, rows, fields) => {
        if (err) throw err

        return res.status(200).send({message: "Registered!"})
    })

    connection.end()
})

module.exports = router;
