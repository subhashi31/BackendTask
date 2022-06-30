const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

require("./db/conn");
const Register = require("./models/registers");

const { json } = require("express");
app.use(express.urlencoded({extended:false}));


app.use('/static', express.static('static'))

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get("/", (req, res)=>{
    Register.find({}, function(err,users){
      res.status(200).render('index.html', { users: users.reverse() });  
    })
 
});

app.get("/add", (req, res)=>{
    res.status(200).render('add.html');
});

app.get("/delete", (req, res)=>{
    res.status(200).render('delete.html');
});

app.post("/add", async(req, res)=>{
    try{
        const addUser = new Register({
            userid: req.body.userid,
            username: req.body.username,
            email: req.body.email
        })

        const added = await addUser.save();

        Register.find({}, function(err,users){
            res.status(200).render('index.html', { users: users.reverse() });  
          })
        
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.post("/delete", async(req, res)=>{
    try{
        const userid = req.body.userid;

        const deleted = await Register.deleteOne( { userid});

        Register.find({}, function(err,users){
            res.status(200).render('index.html', { users: users.reverse() });  
          })
        
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.listen(port, ()=>{
    console.log(`${port}`);
})