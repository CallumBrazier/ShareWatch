const router = require("express").Router();
const User = require("../models/userModels");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    let { email, password, passwordCheck, fullName } = req.body;

    if (!email || !password || !passwordCheck || !fullName) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "Password needs to be at least 5 characters long" });

    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Passwords do not match" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ msg: "Account already exists" });

    const salt = await bcrypt.genSaltSync(10);
    const securePassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: securePassword,
    });

    const savedUser = await newUser.save().then(() => {
      res.json({ msg: "User added!", user: newUser });
    });
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        balance: user.balance,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.delete("/delete", auth, async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.user);
//     res.json(deletedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    fullName: user.fullName,
    id: user._id,
    balance: user.balance,
  });
});

module.exports = router;
