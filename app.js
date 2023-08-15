const app = require("express")();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose
  .connect("mongodb://localhost/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DB");
  });

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashedPw: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res, next) => {
  // here, you can get the username and password from req.body in the actual site. Here, we will hardcode the values.
  const username = "sample2";
  const password = "password";
  const hashedPw = await bcrypt.hash(password, 12);
  const user = await User.create({ username, hashedPw });
  await user.save();
  return res.send(user);
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
