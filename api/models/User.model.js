const mongoose = require('mongoose');

// Schema Definition
const UserSchema = mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required:true},
    phone: { type: String, required:true},
    cin: { type: String},
    gendre: { type: String},
    date_birth: { type: Date},
    image: { type: String},
    address: { type: String},
    is_valid: { type: Boolean, default:false},
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;