const { Router } = require("express");
const passport = require("passport");
const genPassword = require("../../lib/passwordUtils").genPassword;
const { User } = require("../../db");
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;

const usersRouter = Router();

usersRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) throw new Error(err.message);
    if (!user) return res.status(401).send({ msg: "User doesn't exists" });
    else {
      req.logIn(user, (err) => {
        if (err) throw new Error(err.message);
        res.send("Successfully authenticated");
      });
    }
  })(req, res, next);
});

usersRouter.post("/register", async (req, res, next) => {
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  try {
    const emailUser = await User.findOne({ where: { username: req.body.email } });
    if (emailUser !== null) throw new Error();

    const newUser = await User.create({
      username: req.body.email,
      hash: hash,
      salt: salt,
    });
    await newUser.save();
    res.send({ msg: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

usersRouter.get("/user", async (req, res, next) => {
  //const [results] = await conn.query("SELECT * FROM session LIMIT 1");
  //console.log(results[0].sess.passport);
  res.send(req.user.dataValues.username);
});

usersRouter.get("/logout", (req, res, next) => {
  req.logout((r) => console.log(r));
  res.send({ message: "User logged out" });
});

usersRouter.get("/protected-route", isAuth, (req, res, next) => {
  res.status(200).send("The user is authenticated.");
});

usersRouter.get("/admin-route", isAdmin, (req, res, next) => {
  res.send("You made it to the admin route.");
});

module.exports = usersRouter;
