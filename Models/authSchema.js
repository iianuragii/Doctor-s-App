const mongoose = require('mongoose');

// Define the schema for patient signup
const patientSignUpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 3 // Ensure password is at least 3 characters long
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the current timestamp
  },
  updatedAt: {
    type: Date,
    default: Date.now // Automatically updates the timestamp
  }
});

// Middleware to update `updatedAt` before saving
patientSignUpSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


module.exports = mongoose.model('PatientSignUp', patientSignUpSchema);
