const User = require("./../models/user"); //import the user table here   //This model will be used to create objects in post method
const Booking = require("./../models/booking");
const Flight = require("./../models/flight");

const db = require("./../config/database"); //to import config file

exports.view = async function (req, res) {
  res.render("user_login.ejs", { message: "" });
};

exports.uslogin = async function (req, res) {
  console.log(req.body.us_email);
  console.log(req.body.us_password);

  let mail = req.body.us_email;
  let password = req.body.us_password;

  let query = `SELECT * FROM users`;
  const [results] = await db.query(query);

  let flag = 0;
  let usname;
  for (let obj of results) {
    if (obj.u_email == mail && obj.u_password == password) {
      usname = obj.u_name;
      flag = 1;
    }
  }

  let note;
  if (flag) {


    req.session.email = mail;
    req.session.name = usname;

    let query = `SELECT b.b_id , f.f_number , f.f_date , f.f_time FROM flights f, bookings b WHERE b.b_u_email='${mail}' AND f.f_number=b.b_f_number`;
    const [bookings] = await db.query(query);
    console.log(bookings);

    res.render("user_dashboard.ejs",{ bookdash : bookings, username : usname });
  } else {
    note = "Wrong Credentials !!!";
    res.render("user_login.ejs", { message: note });
  }
};

exports.showflights = async function(req,res) {

  date = req.body.form_date;
  time_b = req.body.form_time_begin;
  time_e = req.body.form_time_end;
  
  let query = `SELECT * FROM flights WHERE f_date='${date}' AND f_time BETWEEN '${time_b}' AND '${time_e}'`;
  const [flights] = await db.query(query);
  console.log(req.session.name);
  res.render("showflight.ejs",{show : flights , username : req.session.name});
};

exports.bookflight = async function(req,res) {

  let query1 = `SELECT * FROM flights where f_number=${req.params.fid}`
  const [row] = await db.query(query1);

  let seatAvailable = row[0].f_seats;
  console.log(seatAvailable);

  if(seatAvailable>0)
  {
    let query = `INSERT INTO bookings (b_id, b_u_email, b_f_number) VALUES (NULL,'${req.session.email}', ${req.params.fid});`
    await db.query(query);

    let newSeatCount = seatAvailable-1;

    let query2 = `UPDATE flights SET f_seats=${newSeatCount} WHERE f_number=${req.params.fid}`;
    await db.query(query2);

    let query3 = `SELECT b.b_id , f.f_number , f.f_date , f.f_time FROM flights f, bookings b WHERE b.b_u_email='${req.session.email}' AND f.f_number=b.b_f_number`;
    const [bookings] = await db.query(query3);
  
    res.render("user_dashboard.ejs",{bookdash : bookings, username : req.session.name});
  }
  else
  {
    let query = `SELECT b.b_id , f.f_number , f.f_date , f.f_time FROM flights f, bookings b WHERE b.b_u_email='${req.session.email}' AND f.f_number=b.b_f_number`;
    const [bookings] = await db.query(query);
  
    res.render("user_dashboard.ejs",{bookdash : bookings, username : req.session.name});
  }
};

exports.signuppg = async function(req,res) {
  res.render("signup.ejs");
};

exports.registerus = async function(req,res) {
  let data = req.body;
  let query = `INSERT INTO users (u_name, u_email, u_address, u_password) VALUES ('${data.us_name}', '${data.us_email}', '${data.us_address}', '${data.us_password}')`;
  await db.query(query);
  res.redirect("/user/");
};
