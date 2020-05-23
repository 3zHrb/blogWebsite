//jshint esversion:6
const express = require("express"); // module.export
const bodyParser = require('body-parser');
const ejs = require('ejs');
var _ = require('lodash');

const homeStartingContent = "Azoz Alharbi is the best dude ever, he works hard to achive his goals every single day no matter what";
const aboutContent = "My Name is Abdulaziz Alharbi, I'm a computer engineer, interested in teachnology";
const contactContent = `Contact me at:
zezo.hoooh@gmail.com
or
+97676756576
`;

let postArray = [];

var choosenElement;


const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); //module.export.urlencoded()


app.listen(2000, function(){
  let time = new Date();

if(time.getHours() >= 12){
  let currentTime = time.getHours()/2;
  console.log(currentTime +":"+  time.getMinutes() + " PM");
}else{
  console.log(time.getHours() +":"+ time.getMinutes() + " AM");
}
console.log("server is running rn");
});


app.get("/", function(req, res){
//   if (postArray.length === 0){
// res.render("home", {titleH1: "Home Page is Here", homeContentP: homeStartingContent});
// }else{
//   res.render("home", {titleH1:postArray[0].title, homeContentP: postArray[0].contentBody});
// }

res.render("home", {post:postArray});

});

app.get("/about", function(req, res){
  res.render("about",{h1Content: aboutContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/contact", function(req,res){
  res.render("contact",{contactContent: contactContent});
});

app.get("/post", function(req,res){



});

app.get("/post/:input", function(req,res){

let parameterRequest = _.lowerCase(req.params.input);

postArray.forEach(function(element){
var postTitle = _.lowerCase(element.title);


if (postTitle === parameterRequest){

  res.render("post", {title: element.title, content: element.contentBody});

}else{
  console.log("No Match");
}

});


});


app.post("/compose", function(userRequest, ResponseToUser){

var userPostCollectorObject = {
title: userRequest.body.title,
contentBody: userRequest.body.contentBody
};

postArray.push(userPostCollectorObject);

ResponseToUser.redirect("/");

});
