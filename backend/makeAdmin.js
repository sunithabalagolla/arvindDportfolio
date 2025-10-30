const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function makeAdmin() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to database');
    
    // ⚠️ CHANGE THIS TO YOUR EMAIL (the one you registered with)
    const email = 'sunithabalagolla@gmail.com';
    
    // Find user and make them admin
    const user = await User.findOneAndUpdate(
      { email: email },
      { role: 'admin' },
      { new: true }
    );
    
    if (user) {
      console.log('🎉 SUCCESS! User is now admin:');
      console.log('   Email:', user.email);
      console.log('   Name:', user.firstName);
      console.log('   Role:', user.role);
      console.log('\n✅ You can now login at: http://localhost:5173/admin/login');
    } else {
      console.log('❌ ERROR: User not found with email:', email);
      console.log('💡 Make sure you have:');
      console.log('   1. Registered at /signup');
      console.log('   2. Verified your email with OTP');
      console.log('   3. Used the correct email address');
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the function
makeAdmin();