const { User, Todo } = require("../db");
const userAuth = require("../middlewares/userAuth");
const { todoZodSchema, updateTodoZodSchema } = require("../zodValidation");

const router = require("express").Router();
// Get All todos
router.get("/", userAuth, async (req, res) => {
  try {
    const username = req.username;

    const user = await User.findOne({ username }).populate("todos");

    const todos = await Promise.all(
      user.todos.map(({ title, description, completed, _id }) => {
        return {
          _id,
          title,
          description,
          completed,
        };
      })
    );

    res.status(200).json({ todos });
  } catch (err) {
    console.log("Error in Fetching Todos", err);
    res.status(403).json({ msg: "Error in Fetching Todos" });
  }
});

// Create Todo
router.post("/todo", userAuth, async (req, res) => {
  try {
    const username = req.username;
    const title = req.body.title;
    const description = req.body.description;

    const validate = todoZodSchema.safeParse({ title, description });
    if (!validate.success) return res.status(403).json({ msg: "Wrong Inputs" });

    const user = await User.findOne({ username });
    const todo = await Todo.create({ title, description, userID: user._id });

    await user.updateOne({ $push: { todos: todo._id } });
    res.status(200).json({ msg: "Todo Created Successfully" });
  } catch (err) {
    console.log("Error in Todo Creation", err);
    res.status(403).json({ msg: "Error in Todo Creation" });
  }
});

// Mark Completed
router.put("/mark/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const validate = updateTodoZodSchema.safeParse({ _id });

    if (!validate.success) return res.status(403).json({ msg: "Wrong Inputs" });

    const todo = await Todo.findById(_id);

    if (!todo) return res.status(403).json({ msg: "Todo Not Found" });

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({ msg: "Todo Marked" });
  } catch (err) {
    console.log("Error in Todo Creation", err);
    res.status(403).json({ msg: "Error in Todo Creation" });
  }
});

module.exports = router;
