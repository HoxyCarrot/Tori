import mysql from 'sync-mysql';

var db_info = {
    host: 'ec2-3-137-156-70.us-east-2.compute.amazonaws.com',
    port: '3306',
    user: 'carrot',
    password: 'carrot2021',
    database: 'Tori'
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}