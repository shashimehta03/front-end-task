//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _=require("lodash");  //for converting the url entered by user after localhost:3000/...... into lowercase and without any hiphens , dots or underscore.
const https=require("https"); //for sending the data of the form to the mailchimp website.
const nodemailer = require('nodemailer'); // for sending emails


const mailchimp = require("@mailchimp/mailchimp_marketing");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res)
{ 
  
  res.render("index");
  
  
});

app.get("/about",function(req,res)
{
  res.render("about");
});


let Name=[];
  let Email=[];
let Phone=[];
let Message=[];


app.get("/contact",function(req,res)
{
  res.render("contact");
});

app.post('/contact', function(req, res) {
  Name = req.body.Name;
  Email = req.body.Email;
  Phone = req.body.Phone;
  Message = req.body.Message;

  return res.render('contact2', {
    NameContent: Name,
    EmailContent: Email,
    PhoneContent: Phone,
    MessageContent: Message
  });
});

app.get("/contact2",function(req,res)
{
  res.render("contact2");
});

// app.post("/contact",function(req,res)
// {
//   Name=req.body.Name;
//   Email= req.body.Email;
//   Phone=req.body.Phone;
//   Message= req.body.Message;

//   console.log(Name);

  
// });

// app.get("/contact2",function(req,res)
// {
  
// }); 

app.get("/signIn",function(req,res)
{
  res.render("signIn");
}); 


app.post("/SignIn", async function(req,res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const password = req.body.pname;

  try {
    // save the new subscriber
    const N = new Newsletter({
      email_address: email,
      password: password
    });
    await N.save();

    // send newsletter to all subscribers
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'matt12@ethereal.email',
          pass: 'zUnCKcZQyeQgbGYtZT'
      }
    });
    // const users = await User.find({}, 'email_address');
    // const emails = users.map(user => user.email_address);
    // emails.forEach(email => {
    //   console.log(email);
      const mailOptions = {
        from: '8228935781r@gmail.com',
        to: N.email_address,
        subject: "Hello friends namaste.",
        text: "kya re kaisan baa"
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.render("success_newsletter");
        }
      
    });
  } catch (error) {
    console.error('Error:', error);
  }
});

  

app.get("/success",function(req,res)
{
   res.render("success");
});

app.get("/failure",function(req,res)
{
   res.render("failure");
});

app.get("/LogIn",function(req,res)
{
  res.render("LogIn");
});



app.get("/SignInOriginal",function(req,res)
{
    res.render("SignInOriginal");
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});


// API KEY - 7f5b86c00ba71deabf12aee3022977a7-us21
//audience id - 7dc8c2a91b 
