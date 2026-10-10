var User = require('../models/user');

// POST /api/register - create a new user
var register = async function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  try {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    await user.save();
    res.status(201).json({ token: user.generateJwt() });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
};

// POST /api/login - authenticate and return a token
var login = async function (req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  try {
    var user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    if (!user.validPassword(req.body.password)) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    res.status(200).json({ token: user.generateJwt() });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = {
  register: register,
  login: login
};
