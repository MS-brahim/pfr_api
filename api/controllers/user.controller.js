const jwt = require('jsonwebtoken');
const {loginValidation, createUserValidation} =require('../validation/user.validation');

const UserModel = require('../models/User.model');
const AuthModel = require('../models/Auth.model');

// USER REGISTER
const createUser = async (req, res)=>{

    // VALIDATION REGISTER-AUTH FIELDS
    // const {error} = registerValidation(req.body);
    // if(error) return res.status(400).send({success:false, message:error.details[0].message});
    // // CHECK IF NUMBER PHONE ALREADY EXISTS 
    const phoneExist = await UserModel.findOne({phone:req.body.phone});
    if(phoneExist) return res.send({success:false, message:'Phone Number already exists'});
    // CHECK IF ADDRESS EMAIL ALREADY EXISTS 
    const emailExist = await UserModel.findOne({email:req.body.email});
    if(emailExist) return res.send({success:false, message:'Address e-mail already exists'});

    const newUser = new UserModel({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
        email:req.body.email,
        cin:req.body.cin,
        gendre:req.body.gendre,
        date_birth:req.body.date_birth,
        image:req.body.image,
        address:req.body.address,
    });

    try {
        await newUser.save( async (err, user)=>{
            
            if (err) {
                return res.send({
                    success: false,
                    message: 'Failed to save the user'
                });
            }
            const authAttr = new AuthModel({
                userId: user._id,
                email: req.body.email,
                password: req.body.password,
            })
            const authSave = await authAttr.save()
            res.send({
                success: true,
                message:'User saved',
                user,
                authSave
            });
        });
    } catch (error) {
        res.send({success: false, message:error})
    } 
};

// FIND ALL USERS
const findAllUsers = async (req,res)=>{
    try {
        const Users = await UserModel.find();
        res.json(Users) 
    } catch (error) {
        res.json({message:error})
    }
};

// FIND USER BY ID
const findUserById = async (req, res)=>{
    try {
        const User = await UserModel.findById({_id:req.params.id});
        res.status(200).json(User);
    } catch (error) {
        res.json({message:error})
    }
}

// VALIDATE USER
const validateUser = async (req, res)=>{
    try {
        const UserIsValid = await UserModel.updateOne(
            {_id:req.params.id},
            {
                $set:{is_valid:true },
            }
        );
        res.status(200).json(UserIsValid);
    } catch (error) {
        res.json({message:error})
    }
}

// UPDATE USER
const updateUser = async (req, res)=>{
    try {
        const UserUpd = await UserModel.updateOne(
            {_id:req.params.id},
            {
                $set:{
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    phone:req.body.phone,
                    email:req.body.email,
                    cin:req.body.cin,
                    gendre:req.body.gendre,
                    date_birth:req.body.date_birth,
                    image:req.body.image,
                    address:req.body.address,
                },
            }
        );
        res.status(200).json(UserUpd);
    } catch (error) {
        res.json({message:error})
    }
}

// DELETE USER 
const deleteUser = async (req, res)=>{
    try {
        const UserDel = await UserModel.remove({_id:req.params.id});
        res.json(UserDel);
    } catch (err) {
        res.json({message:err});
    }
}

module.exports = {
    createUser,
    findAllUsers,
    validateUser,
    findUserById,
};