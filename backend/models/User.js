
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');



const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
this.password = await bcryptjs.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  
  return bcryptjs.compare(candidatePassword, this.password);

};

module.exports = mongoose.model('User', userSchema);





