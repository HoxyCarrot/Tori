require('dotenv').config();
var mysql = require('mysql');

module.exports = {
    // need singleton
    init: (server)=>{
        let config
        if (server === 'PROD') {
            config = {
                host: process.env.PROD_HOST,
                user: process.env.PROD_USER,
                password: process.env.PROD_PW,
                database: process.env.PROD_DB,
                port: process.env.PROD_PORT
            }
        }
        else if (server === 'DEV') {
            config = {
                host: process.env.DEV_HOST,
                user: process.env.DEV_USER,
                password: process.env.DEV_PW,
                database: process.env.DEV_DB,
                port: process.env.DEV_PORT
            }
        }
        
        return mysql.createConnection(config)        
    },
    open:(db)=>{
        db.connect();
        console.log('connect Success');
    },
    close:(db)=>{
        db.end();
        console.log('DB disconnect')
    }
};
