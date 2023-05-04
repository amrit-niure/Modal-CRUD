const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true

  },
  gender: {
    type: String,
    required: true

  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
