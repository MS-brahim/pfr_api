const mongoose = require('mongoose');
const CategoryModel = require('./Category.model');
const UserModel = require('./User.model');

const PackageSchema = mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:UserModel},
    category_id:{type:mongoose.Schema.Types.ObjectId, ref:CategoryModel},
    name:{type:String, required:true},
    images:{type:Array, required:true},
    weight:{type:Number, required:true},
    description:{type:String, required:true},
    adress_dest:{type:String, required:true},
    departure:{type:String, required:true},
    destination:{type:String, required:true},
    date_depart:{type:Date, required:true},
    date_dest:{type:Date, required:true},
}, { timestamps: true });

const PackageModel = mongoose.model('Package', PackageSchema);

module.exports = PackageModel;