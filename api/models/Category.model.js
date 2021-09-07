const mongoose = require('mongoose');

// Schema Definition
const CategorySchema = mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    image: { 
        type: String,
    }
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;