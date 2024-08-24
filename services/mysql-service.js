function sqlConnect(){
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: '2alab'
    })

    return connection
}

module.exports = {
    sqlConnect
}