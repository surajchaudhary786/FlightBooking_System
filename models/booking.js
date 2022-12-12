const Sequelize=require("sequelize");    //Sequelize is a Node. js-based Object Relational Mapper that makes it easy to work with MySQL, MariaDB, SQLite, PostgreSQL databases, and more. 
const db=require("../config/database");   //connect database
const Flight = require("./flight");
const User = require("./user");

//in define we use same table name as in xampp
//also take care --> in xamp 's' is added at the end of each table. eg: table1s
const Booking=db.define("booking",{               
    b_id:{                               //use same attribute name as in database table
        type:Sequelize.INTEGER,          // mention the type of attribute matching with the sql tables this way
        autoIncrement: true,
        primaryKey: true,
    },
    b_u_email:{
        type:Sequelize.STRING,
        references:{
            models: User,
            key:"u_email",
        }
    },
    b_f_number:{
        type:Sequelize.STRING,
        references:{
            models:Flight,
            key:"f_number",
        }
    },
},
{
    timestamps:false
});

//Don't forget to export so that it will be usable further
module.exports=Booking;