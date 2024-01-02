const PORT = 5000;
const express = require('express');
const multer = require('multer');
const uploadController = require('./uploadController')
const cors = require('cors');
const app = express();
require("./database/config");
const User = require('./database/User');
const Question = require('./database/Question');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.use(express.json());
require('dotenv').config();
process.env.OPENAI_API_KEY = 'Enter Your Api Key Here';


const storage = multer.diskStorage({
  destination : (req, file , cb) =>{
    cb(null, "uploads/")
  },
  filename: (req, file, cb)=>{
    cb(null, 'test.pdf')
  },
})

const uploadStorage = multer({storage:storage})

app.post('/upload',uploadStorage.single("file"), uploadController.embeding)

app.post("/answer", async (req, res) => {
  const userid = req.body.userid;
  // console.log('userapi',userid); 
  uploadController.retrival(req, res);
});
app.get('/', (req, res) => {
  return res.status(200).send("It's working");
});

app.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ error: "Email already exists" });
    }

    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});
app.post("/login", async (req, res) =>{
  // console.log(req.body);
  if (req.body.password && req.body.email) {
      let user = await User.findOne({email:req.body.email}).select("-password");
      if (user) {
          res.send(user)
      } else {
          res.send({result: "no user found"})
      }
  }else{
      res.send({result: "no user found"})
  }
})




app.get("/list/:id", async (req, res) => {

  Question.find({userid:req.params.id})
  .then(users => res.json(users))
  .catch(error => res.json(error))
})

  

app.listen(PORT, () => {
  console.log(`Server Running sucessfully on PORT ${PORT}`);
});
