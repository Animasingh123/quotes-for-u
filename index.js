// it is for reference purpose. dont use this
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const port = 800;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/contact",{useNewUrlParser:true,useUnifiedTopology:true});


var nameSchema = new mongoose.Schema({
  Name: String,
  phone: Number,
  email: String,
  address: String,
  desc : String
});

var User = mongoose.model("User", nameSchema);



app.set('view engine','pug')   // set the template as pug
app.set('views', path.join(__dirname, 'views'))

app.get("/", (req, res) => {
  
    res.status(200).render('home.pug',);
});
app.get('/contact', (req,res)=>{
    
    res.status(200).render('contact.pug');
})
app.get('/about', (req,res)=>{
    
    res.status(200).render('contact.pug');
})


app.post("/contact", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send('<h1>Thank You. <br>Your response has been recorded.</h1>');
      //or for popup alert:-   res.send('<script>alert("items saved to db")</script>');
      //or  res.send("items saved to db");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


app.listen(port,() =>{
    console.log("server running at port ${port}");
})