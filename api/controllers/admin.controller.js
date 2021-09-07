const jwt = require('jsonwebtoken');
const AdminModel = require('../models/Admin.model');

// ADMIN LOGIN 
const login = async (req, res)=>{

    const email = req.body.email;
    const password = req.body.password;

    const query = { email}
    // CHECK IF ADMIN ALREADY EXISTS 
    await AdminModel.findOne(query, (err, admin) => {
        //Error during exuting the query
        if (err) {
            return res.send({
                success: false,
                message: 'Error, please try again'
            });
        }

        //No Admin match the search condition
        if (!admin) {
            return res.send({
                success: false,
                message: 'Error, Account not found'
            });
        }

        //Check if the password is correct
        admin.isPasswordMatch(password, admin.password, (err, isMatch) => {

            //Invalid password
            if (!isMatch) {
                return res.send({
                    success: false,
                    message: 'Error, Invalid Password'
                });
            }

            //ADMIN IS VALID
            //Generating the token
            const token = jwt.sign({ admin }, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIR });

            //This object is just used to remove the password from the retuned fields
            let returnAdmin = {
                full_name: admin.full_name,
                phone: admin.phone,
                email: admin.email,
                id: admin._id
            }

            //Send the response back
            return res.send({
                success: true,
                message:'Login SuccessFully', 
                admin: returnAdmin,
                token
            });
        });

    });
};

// ADMIN REGISTER
const register = async (req, res)=>{

    // VALIDATION REGISTER-AUTH FIELDS
    // const {error} = registerValidation(req.body);
    // if(error) return res.status(400).send({success:false, message:error.details[0].message});
    // // CHECK IF NUMBER PHONE ALREADY EXISTS 
    const phoneExist = await AdminModel.findOne({phone:req.body.phone});
    if(phoneExist) return res.send({success:false, message:'Phone Number already exists'});
    // CHECK IF ADDRESS EMAIL ALREADY EXISTS 
    const emailExist = await AdminModel.findOne({email:req.body.email});
    if(emailExist) return res.send({success:false, message:'Address e-mail already exists'});


    const reqB = req.body;
    const newAdmin = new AdminModel({
        full_name   : reqB.full_name,
        email       : reqB.email,
        phone       : reqB.phone,
        password    : reqB.password,
    });

    try {
        await newAdmin.save((err, admin)=>{
            if (err) {
                return res.send({
                  success: false,
                  message: 'Failed to save the admin'
                });
            }
            res.send({
                success: true,
                message:'Admin saved',
                admin
            });
        });
    } catch (error) {
        res.json({message:error})
    } 
};

// FIND ADMIN BY ID
const getAdminById = async (req, res)=>{
    try {
        const admin = await AdminModel.findById({_id:req.params.id});
        res.status(200).json(admin);
    } catch (error) {
        res.json({message:error})
    }
}

module.exports = {
    register,
    login,
    getAdminById,
};