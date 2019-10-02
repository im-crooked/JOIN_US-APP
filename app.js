var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var faker = require("faker");
var ejs = require("ejs");

//app-configurations
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extende:true}));
app.use(express.static(__dirname+"/public"));

//port-connection
app.listen(3000,()=>{
	console.log("Server Started");
})

//databse-connection
var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	database:"join_us"
});

//routes
app.get("/",(req,res)=>{
	var q = "SELECT COUNT(*) as COUNT FROM users";
	connection.query(q,(err,results)=>{
		if (err) throw err;
		var count = results[0].COUNT;
		res.render("home",{count:count});
	});
});

app.post("/register",(req,res)=>{
	var person ={
		email: req.body.email
	};
	connection.query("INSERT INTO users SET ?",person,(err,results)=>{
		if (err) throw err;
	     res.redirect("/");
	});
});