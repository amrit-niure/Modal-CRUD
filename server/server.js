const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

app.use(cors()); // cross origin resource sharing 
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send("This is the home page")
})

// fetch
app.get('/api', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete
app.delete('/api/:id', async (req, res) => {
  try{
    let delUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send({msg: delUser});
  }catch(err){
    res.status(400).send({msg: "invalid delete operation"});
  }

})

// update
app.put('/api/:id', async (req, res) => {
  try {
    let editUser = await User.findByIdAndUpdate(req.params.id, {...req.body}, {new: true});
    res.status(200).send({msg: editUser});
  } catch (error) {
    res.status(404).send({msg: "Error while editing data"})
  }
})

// create user
app.post('/api/user', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send({msg:user});
  } catch (error) {
    res.send({error});
  }
})

// database connection

const connectDB = async () => {
  try {
    const con = await mongoose.connect('mongodb://127.0.0.1:27017/newdb')
    console.log(`Mongo DB connedted: ${con.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// mongodb connection
connectDB()

app.listen(8000, () => {
  console.log("App is listening at http:localhost:5000")
})