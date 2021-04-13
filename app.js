const express = require("express");
const bodyParser = require("body-parser");
const date= require(__dirname+"/date.js");



const app = express();

const items=["Buy food", "Cook food","Eat Food"];
const workItems=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


//app get request.
app.get("/", function(req, res) {
  const day= date.getDate();
  res.render("list",{listTitle: day, newListItems:items});
});


//making post request
app.post("/",function(req,res){
const  item=req.body.newItem;

if(req.body.list=='Work'){
  workItems.push(item);
  res.redirect("/work");
}
else{
  items.push(item);
    res.redirect("/");
}




})

//for /work
app.get("/work",function(req,res){
  res.render("list",{listTitle:"Work List",newListItems: workItems})
});

//for /work post
app.post("/work", function(req,res){

  const item=req.body.newItem;
  workItems.push(item);
  res.redirect("/work")
})

//get for /about
app.get("/about", function(req,res){
  res.render("about");
})


//server localhost port
app.listen(3000||process.env.PORT, function() {
  console.log("this server is running on port 3000");
});
