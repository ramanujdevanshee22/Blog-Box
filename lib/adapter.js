const { MongodbAdapter } = require('@lucia-auth/adapter-mongodb');
const mongoose = require('mongoose');
const User = require('../model/User'); // Adjust the path as needed
const Session = require('../model/Sessions'); 

const adapter = new MongodbAdapter(
  mongoose.connection.collection('sessions'),
  mongoose.connection.collection('users')
);

module.exports = {
  adapter,
};
