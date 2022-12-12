const User = require("./../models/user"); //import the user table here   //This model will be used to create objects in post method
const Booking = require("./../models/booking");
const Flight = require("./../models/flight");

const db = require("./../config/database"); //to import config file

exports.view = async function (req, res) {
    res.render("admin_login.ejs",{message:""});
};

exports.log_in = async function (req,res) {

    const ADMIN_EMAIL = "secret@gmail.com";
    const ADMIN_PASSWORD = "mysecretpassword";

    console.log(req.body);

    let note;
    if(req.body.ad_email==ADMIN_EMAIL && req.body.ad_password==ADMIN_PASSWORD)
    {
        let query = `SELECT b.b_id, f.f_number, b.b_u_email, f.f_date, f.f_time FROM flights f, bookings b WHERE b.b_f_number=f.f_number`;
        const [result] = await db.query(query);
        
        let query2 = `SELECT * FROM flights`;
        const [flights] = await db.query(query2);

        res.render("admin_dashboard.ejs",{bookdash:result , flist:flights});
    }
    else
    {
        note = "Wrong Credentials !!!";
        res.render("admin_login.ejs",{message:note});
    }    
}

exports.add = async function(req,res) {

    let data = req.body;

    let query1 = `INSERT INTO flights (f_number, f_date, f_time, f_seats) VALUES (${data.fno},'${data.date}', '${data.time}', ${data.seat})`;
    await db.query(query1);
    
    let query = `SELECT b.b_id, f.f_number, b.b_u_email, f.f_date, f.f_time FROM flights f, bookings b WHERE b.b_f_number=f.f_number`;
    const [result] = await db.query(query);

    let query2 = `SELECT * FROM flights`;
    const [flights] = await db.query(query2);

    res.render("admin_dashboard.ejs",{bookdash:result , flist:flights});
};

exports.remove = async function(req,res) {

    let fno = req.params.fno;

    let query1 = `DELETE FROM flights WHERE f_number=${fno}`;
    await db.query(query1);
    
    let query = `SELECT b.b_id, f.f_number, b.b_u_email, f.f_date, f.f_time FROM flights f, bookings b WHERE b.b_f_number=f.f_number`;
    const [result] = await db.query(query);

    let query2 = `SELECT * FROM flights`;
    const [flights] = await db.query(query2);

    res.render("admin_dashboard.ejs",{bookdash:result , flist:flights});
}
