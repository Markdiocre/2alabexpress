var express = require('express');
var router = express.Router();

var {sqlConnect} = require('../services/mysql-service')

let table_name = 'product'

//Get all
router.get('/',(req,res)=>{
    
    let connection = sqlConnect()
    let sql = `SELECT * FROM ${table_name};`

    connection.connect()

    connection.query(sql, (err, rows, fields)=>{
        if (err) throw err
        if(rows.length <=0) return res.status(404).send({message: "Database is empty"})
        return res.status(200).send({data:rows})
    })

    connection.end()
})

//Get single
router.get('/:prodId',(req,res)=>{
    let {prodId} = req.params

    let connection = sqlConnect()
    let sql = `SELECT * FROM ${table_name} WHERE id="${prodId}";`

    connection.connect()

    connection.query(sql, (err, rows, fields)=>{
        if (err) throw err
        if(rows.length <=0) return res.status(404).send({message: "Product does not exist"})
        return res.status(200).send({data:rows})
    })

    connection.end()
})

//INSERT
router.post('/',(req, res)=>{
    let {name, price} = req.body

    let connection = sqlConnect()
    let sql = `INSERT INTO ${table_name}(name,price) VALUES('${name}',${price});`

    connection.connect()

    connection.query(sql, (err, rows, fields)=>{
        if (err) throw err
        return res.status(200).send({message: "Product Inserted Successfully"})
    })

    connection.end()
})

//UPDATE
router.put('/:prodId',(req,res)=>{
    let {prodId} = req.params
    let {name, price} = req.body

    let connection = sqlConnect()
    let sql = `UPDATE ${table_name} SET name='${name}', price='${price}' WHERE id='${prodId}';`

    connection.connect()

    connection.query(sql, (err, rows, fields)=>{
        if (err) throw err
        return res.status(200).send({message:"Updated successfully"})
    })

    connection.end()
})

//DELETE
router.delete('/:prodId',(req,res)=>{
    let {prodId} = req.params

    let connection = sqlConnect()
    let sql = `DELETE FROM ${table_name} WHERE id='${prodId}'`

    connection.connect()

    connection.query(sql, (err, rows, fields)=>{
        if (err) throw err
        return res.status(200).send({message:"Deleted successfully"})
    })

    connection.end()
})

module.exports = router