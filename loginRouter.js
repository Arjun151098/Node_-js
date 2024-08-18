const express = require('express');
const db = require('../models');
const { route } = require('./route');
const app = express();
app.use(express.json());


const User = db.User;


const login_router = express.Router();


var flag =false;
var otpNumber ;






login_router.get("/login" , async(req, res) => {
    

    const name = req.body.firstName;
    const email = req.body.email;

   


  //  console.log("Name is "+ name +" " +" your email is "+email)

           const Username = await User.findOne({where : {firstName:name , email: email}})


              if(Username == null) {
                res.send("Invalid Credites")
                
              }else {

                let otpnum =  otp();
                //res.send(Username);

                otpver(otpnum);

                res.send("Login sucessfully " + otpnum)
              }

             
           



})

function otp() {

    let digits = '0123456789'; 
    let OTP = ''; 
    let len = digits.length 
    for (let i = 0; i < 4; i++) { 
        OTP += digits[Math.floor(Math.random() * len)]; 
    } 

    

    return OTP;
}



login_router.get("/otpnum/:otp",(req,res) => {

    var otp = req.params.otp;
   // const otpover = otpver();
   
    if(otp == otpNumber) {

        res.send("otp verified")
        flag=true;
    }else {
        res.send("otp invalid")
        flag=false;
        
    }
    
});




login_router.get("/records/all", async(req,res) => {

   var count =0;

    try {
             if(flag==true) {
                const employees =await User.findAll();
                res.json(employees);
             }else {
                res.send("Login first");
                count++;

                
             }

      
        
    } catch (error) {
        res.send(error);
    }
})

function   otpver( num ) {

console.log("otp number is " + num)
    otpNumber = num;
    
}





module.exports = login_router;
//module.exports = flag;

 
