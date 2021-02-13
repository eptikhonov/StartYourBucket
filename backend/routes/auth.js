var express = require('express');
var router = express.Router();
const { User } = require('../models');
const { registerValidation, loginValidation } = require('../util/validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  // validate request body with schema
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    // check for existing user
    const email = req.body.email;
    const existingUser = await User.findOne({ email }).catch((err) =>
      console.log(err)
    );
    if (existingUser)
      return res.status(400).json({ error: 'Email already exists' });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
      ...req.body,
      loginTypes: ['password'],
      password: hashedPassword
    });
    await user
      .save()
      .then((data) => {
        res.status(200).json({ user: user._id }); // return new user id
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

router.post('/login', async (req, res) => {
  // validate request body with schema
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // check for existing email/user
  const existingUser = await User.findOne({
    email: req.body.email
  }).catch((err) => console.log(err));
  if (!existingUser) return res.json('Email is not found');

  // validate password
  const validPassword = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );
  if (!validPassword) return res.status(400).json('The password is incorrect');

  // assign token
  const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET);
  return res.header('Auth-Token', token).status(200).json(token);
});

module.exports = router;
