const express = require('express')
const app = express();
app.use(express.json());

 


//console.log(flag)

//var urlencodedParser = bodyParser.urlencoded({ extended: false })


const route = express.Router();
const db = require('../models');
const { where } = require('sequelize');
const User = db.User;



//flag = require("./loginRouter");


route.get("/all", async(req, res) => {
          try {

            const users = await User.findAll();
            res.status(200).json(users);
            
          } catch (error) {
            res.status(404).json(error);
          }
})



route.get("/user/:id", async(req, res) => {
          try {

            const id=req.params.id;

            const users = await User.findOne({where :{id:id}});

            if(users ==null) {
              res.status(401).send("Not founded");
            }else{
               
               res.status(200).json(users);
            }
            
            
          } catch (error) {
            res.status(404).json(error);
          }
})




route.put("/update/:id",async (req, res) => {
  try {

   
   const id = req.params.id;
   const firstName = req.params.name;

   
 

   console.log("hellow");
   console.log(id);
   console.log(firstName);
   

    //const userupdate =await User.update({firstName: firstName}, {where: { id :req.params.id}});
    const userupdate =await User.update(req.body, {where: { id :req.params.id}});

   
    
     if(userupdate ==true) {
              const users = await User.findOne({where :{id:id}});

              if(!users) {
                res.send("no record founded")
              }
              res.send(users)
       }else {
         res.send("Not update")
      }

    

   


    
    
    
  } catch (error) {
    res.status(404).json(error);
  }
})









route.get("/check",(req,res) => {

  const record= req.body;

  

 

  
  console.log(record)
})






module.exports = route;