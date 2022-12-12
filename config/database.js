const Sequelize = require("sequelize");                          // package
// templatedb is the name of database (check xampp)
module.exports = new Sequelize("flight_booking", "root", "", {       // db name , username , password 
  host: "localhost",
  dialect: "mysql",
});