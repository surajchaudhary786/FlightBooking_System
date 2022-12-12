const Sequelize=require("sequelize");    //Sequelize is a Node. js-based Object Relational Mapper that makes it easy to work with MySQL, MariaDB, SQLite, PostgreSQL databases, and more. 
const db=require("../config/database")   //connect database

//in define we use same table name as in xampp
//also take care --> in xamp 's' is added at the end of each table. eg: table1s
const User=db.define("user",{               
    u_name:{                               //use same attribute name as in database table
        type:Sequelize.STRING
    },
    u_email:{
        type:Sequelize.STRING,
        primaryKey: true,
    },
    u_address:{
        type:Sequelize.STRING
    },
    u_password:{
        type:Sequelize.STRING
    },
},
{
    timestamps:false
});

//Don't forget to export so that it will be usable further
module.exports=User;