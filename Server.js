const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/User");
const connectdb = require("./config/connect");
require("dotenv").config({ path: "./config/save.env" });
const app = express();
const PORT = 4000;
app.use(express.json());
connectdb();
//GET
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//POST
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//PUT
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndRemove({
      _id: req.params.id,
    }).exec();
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send({ msg: "error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
