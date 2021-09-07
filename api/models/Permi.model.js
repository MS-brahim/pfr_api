const mongoose = require('mongoose');

const PermiSchema = mongoose.Schema({
    name:{type:String, required:true},
    type:{type:String, required:true}
})

const PermiModel = mongoose.model('Permi', PermiSchema);

module.exports = PermiModel;


