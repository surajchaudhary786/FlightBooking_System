const express = require("express"); //to use express
const bodyParser = require("body-parser"); //body parser json<->string
const path = require("path"); //path to join static etc
const app = express(); //to utilize express app

const db = require("./config/database");  //to import config file
db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log("Error: " + err));

//The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));

//To mess around with json objects
app.use(express.json());

//here ejs is set as ejs --- BUT --- you can also use handlebars
app.set("view-engine", "ejs"); 

//load static objects  --- so that our app can use public folder now
app.use(express.static(path.join(__dirname, "public")));

//for parsing and getting around with json objects
app.use(bodyParser.json());

// -------------------------------SESSIONS---------------------------------------
//for handling sessions 
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(session({
    resave : true,
    saveUninitialized:true,
    secret:"mysecretkey",                 //this is secret key put them env variable;
}))

// --------------------------YOUR CODE GOES HERE--------------------------------

//ROUTES ---
app.get('/', async(req,res)=>{
    res.render("main.ejs"); 
})

const userRouter = require("./routes/userRoutes");
app.use("/user/", userRouter);

const adminRouter = require("./routes/adminRoutes");
app.use("/admin/", adminRouter);

// ----------------------------------------------------------------------------
app.listen(5000);
