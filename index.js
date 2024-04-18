const express=require('express');
const app=express();

const person=require('./todoapp/user');
 const bodyparser=require('body-parser');
const db=require('./todoapp/db');
app.use(express.json())
 app.use(bodyparser.json());
 app.use(express.urlencoded({
    extended:true
 }))
//  const personrouts=require('./routs');
// app.use('/',personrouts);
app.post('/resistration',async function(req,res){
    try{
          const data=req.body;
      const newperson=new person(data);
     const response= await newperson.save();
     console.log('data saved');
     res.status(200).json(response);
    }catch(err){
        console.log("error "+err);
       res.status(500).json({error:"Invalise operations"});
    }
});
app.get('/login',async function(req,res){
    try {
       const data=req.body;
    const responce=await person.find({email:data.email,passward:data.passward});
    console.log(responce);
  if (responce.length === 0) {
    res.status(404).json({err: "Invalid username or password"});
} else {
    res.status(200).json(responce);
}
    } catch (err) {
              res.send(500).json({err:"Invalid everything"});
  
    }
    
});
   app.listen(3000,()=>{
    console.log("lising on port 3000");
   });