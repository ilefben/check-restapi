const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    await mongoose.connect("mongodb+srv://benhammoudailef:ilef@cluster0.xhkfvxm.mongodb.net/?retryWrites=true&w=majority");
    console.log("bd is connected");
  } catch (error) {
    console.log("error db");
  }
};
module.exports = connectdb;
