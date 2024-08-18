const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./models');
const User = db.User;

const rout = require("./routes/route");

const loginRouter = require("./routes/loginRouter");

//const otp = require("./routes/loginRouter")

const bodyParser = require('body-parser');





const port = process.env.PORT || 8082;


app.use(express.json())


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(rout,loginRouter);


app.post("/user", async(req, res)=> {
   try {

    const useradd =  await User.create(req.body);
    res.status(200).json(useradd);

    
    
   } catch (error) {
    res.status(400).json(error);
   }
})


app.listen(port, (err) => {
    if(err) {
        console.log(err)
    }else {
        console.log("Port is working is " + port)
    }
})