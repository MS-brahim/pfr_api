const jwt = require('jsonwebtoken');
const AuthModel = require('../models/Auth.model');

// AUTH LOGIN 
const login = async (req, res)=>{

    const email = req.body.email;
    const password = req.body.password;

    const query = { email}
    // CHECK IF AUTH ALREADY EXISTS 
    await AuthModel.findOne(query, (err, auth) => {
        //Error during exuting the query
        if (err) {
            return res.send({
                success: false,
                message: 'Error, please try again'
            });
        }

        //No Auth match the search condition
        if (!auth) {
            return res.send({
                success: false,
                message: 'Error, Account not found'
            });
        }

        //Check if the password is correct
        auth.isPasswordMatch(password, auth.password, (err, isMatch) => {

            //Invalid password
            if (!isMatch) {
                return res.send({
                    success: false,
                    message: 'Error, Invalid Password'
                });
            }

            //AUTH IS VALID
            //Generating the token
            const token = jwt.sign({ auth }, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIR });

            //This object is just used to remove the password from the retuned fields
            let returnAuth = {
                email: auth.email,
                id: auth._id,
                userId:auth.userId
            }

            //Send the response back
            return res.send({
                success: true,
                message:'Login SuccessFully', 
                auth: returnAuth,
                token
            });
        });

    }).populate('userId');
};

// FIND AUTH BY ID
const getAuthById = async (req, res)=>{
    try {
        const auth = await AuthModel.findById({_id:req.params.id}).populate('userId');
        res.status(200).json(auth);
    } catch (error) {
        res.json({message:error})
    }
}

module.exports = {
    login,
    getAuthById,
};