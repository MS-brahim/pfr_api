const mongoose = require('mongoose');
const UserModel = require('./User.model');

const ServiceSchema = mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:UserModel},
    departure:{type:String, required:true},
    destination:{type:String, required:true},
    address_dest:{type:String, required:true},
    address_depart:{type:String, required:true},
    date_depart:{type:Date, required:true},
    date_dest:{type:Date, required:true},
    is_valid:{type:Boolean, default:false},

    image:{type:String, required:false},
    weight:{type:String, required:false},
}, { timestamps: true });

const ServiceModel = mongoose.model('Service', ServiceSchema);

module.exports = ServiceModel;