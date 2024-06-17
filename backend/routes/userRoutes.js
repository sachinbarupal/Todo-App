const { User } = require("../db");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { userZodSchema } = require("../zodValidation");

router.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const validate = userZodSchema.safeParse({ username, password });
    if (!validate.success) return res.status(403).json({ msg: "Wrong Inputs" });

    await User.create({
      username,
      password,
    });

    res.status(200).json({ msg: "Signup Success" });
  } catch (err) {
    console.log("Error in SignUp", err);
    res.status(403).json({ msg: "Error in SignUp" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const validate = userZodSchema.safeParse({ username, password });
    if (!validate.success) return res.status(403).json({ msg: "Wrong Inputs" });

    const user = await User.findOne({ username, password });
    if (!user) return res.status(403).json({ msg: "User Not Found" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (err) {
    console.log("Error in SignIn", err);
    res.status(403).json({ msg: "Error in SignIn" });
  }
});

module.exports = router;
