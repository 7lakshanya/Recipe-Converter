const express= require("express");
const bodyParser= require("body-parser");
const ejs=require("ejs");

const app=express();
var recipe="";

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
  res.render("pages/index");
});

app.get("/result",function(req,res){
  res.render("pages/result",{
    resultContent:recipe
  });
  recipe="";
});


app.post("/newrecipe",function(req,res){
  recipe=req.body.resultvalue;
  res.render("pages/loading");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running");
});
