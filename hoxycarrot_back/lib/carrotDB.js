var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'ec2-3-137-156-70.us-east-2.compute.amazonaws.com',
    user: 'carrot',
    password: 'carrot2021',
    database: 'Tori',
    port: 3306,
});

db.connect();

module.exports=db;