const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => console.log("Err in DB Connection", err));

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userID: mongoose.Schema.Types.ObjectId,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = { User, Todo };
