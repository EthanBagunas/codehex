var mysql = require("mysql2");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpass",
    database: "testing1",

});

module.exports= con;
