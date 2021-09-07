const CategoryModel = require('../models/Category.model');

// FIND ALL CATEGORIES 
const findAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.send({
            success:true,
            message:'find all categories !SUCCESS',
            categories
        }) 
    } catch (error) {
        res.send({success: false, message:error})
    }
}

// FIND CATEGORY BY ID 
const findCategoryById = async (req, res) => {
    try {
        const category = await CategoryModel.findById({_id:req.params.id});
        res.status(200).send({
            success: true,
            message: 'find category by id successFully',
            category
        });
    } catch (error) {
        res.json({success: false, message:error})
    }
}

// CREATE NEW CATEGORY 
const createCategory = async (req, res) => {

    const bodyCategory = new CategoryModel({
        name   : req.body.name,
        image  : req.body.image,
    });

    try {
        const newCategory =  await bodyCategory.save()
        res.send({
            success: true,
            message:'Category saved',
            newCategory
        });
        
    } catch (error) {
        res.send({success: false, message:error})
    } 
}

// UPDATE CATEGOqRY 
const updateCategory = async (req, res) => {
    try {
        const categoryUpdated = await CategoryModel.updateOne(
            {_id:req.params.id},
            {
                $set:{
                    name:req.body.name,
                    image:req.body.image
                },
            }
        );
        res.status(200).send({
            success: true,
            message:'Category updated successFully',
            categoryUpdated
        });
    } catch (error) {
        res.send({success: false, message:error})
    }
}

// DELETE CATEGORY 
const deleteCategory = async (req, res) => {
    try {
        const categoryDelete = await CategoryModel.deleteOne({_id:req.params.id});
        res.send(
            {
                success:true,
                message:'SUCCESS! item deleted ',
                categoryDelete
            }
        );
    } catch (err) {
        res.send({success:false, message:err});
    }
}

module.exports = {
    findAllCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}