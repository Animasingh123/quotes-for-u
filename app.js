const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const port = 800;
mongoose.connect("mongodb://localhost:27017/contactquotes",{useNewUrlParser:true,useUnifiedTopology:true});


//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
//contact model
var contact = mongoose.model("contact", contactSchema);

//express specific stuff
app.use('/static', express.static('static'))  //for serving static files
app.use(express.urlencoded())

//pug specific stuffs
app.set('view engine','pug')   // set the template as pug
app.set('views', path.join(__dirname, 'views'))   // set the views directory

//endpoints
app.get('/', (req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
})
app.get('/contact', (req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
})

app.post('/contact', (req,res)=>{
    var myData = new contact(req.body);
    myData.save()
    .then(item => {
       res.redirect('/')
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

//start the server
app.listen(port,()=>{
    console.log("app listening at port ${port}");
});