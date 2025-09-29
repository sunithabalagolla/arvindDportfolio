const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const result = await User.updateOne(
      { email: "sunisunitha7011@gmail.com" },  // Your existing user account
      { $set: { role: "admin" } }               // Promote to admin
    );
    
    console.log('Updated:', result.modifiedCount, 'document(s)');
    
    const user = await User.findOne({ email: "sunisunitha7011@gmail.com" });
    console.log('Current role:', user.role);
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });