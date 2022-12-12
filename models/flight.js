const Sequelize=require("sequelize");    //Sequelize is a Node. js-based Object Relational Mapper that makes it easy to work with MySQL, MariaDB, SQLite, PostgreSQL databases, and more. 
const db=require("../config/database")   //connect database

//in define we use same table name as in xampp
//also take care --> in xamp 's' is added at the end of each table. eg: table1s
const Flight=db.define("flight",{               
    f_number:{                               //use same attribute name as in database table
        type:Sequelize.INTEGER,          // mention the type of attribute matching with the sql tables this way
        primaryKey: true,
    },
    f_date:{
        type:Sequelize.DATE
    },
    f_time:{
        type:Sequelize.TIME
    },
    f_seats:{
        type:Sequelize.INTEGER
    },
},
{
    timestamps:false
});

//Don't forget to export so that it will be usable further
module.exports=Flight;