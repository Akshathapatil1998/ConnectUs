var express=require('express');
var app=express();
var mysql=require('mysql');
var bodyParser=require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));


var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'Join_Us',
    port:3307
});

app.get("/",function(req,res){
    //Find count of users in DB
    var q="SELECT COUNT(*) as count FROM USERS";
    con.query(q,function(err,results){
        if (err) throw err;
        var count= results[0].count;
        //res.send("We have "+count+" users in our DB");
        res.render("home",{data:count});
    });
    
});

app.post("/register",function(req,res){
    var person={
        email:req.body.email
    };
    con.query('Insert into users SET?',person,function(err,results){
        if (err) throw err
        //res.send("Thanks for connecting us");
        res.redirect("/");
        });
});

app.get("/joke",function(req,res){
    var joke= "What do you call a dog that does magic tricks? A labredeer";
    res.send(joke);
});
app.get("/random_num",function(req,res){
   var num =Math.floor(Math.random());
    res.send("Your lucky number is " + num);
});

app.listen(8080,function(){
    console.log("Server Running on 3000");
});