const ServiceModel = require('../models/Service.model');

// FIND ALL SERVICES 
const findAllServices = async (req, res) => {
    try {
        const q = {is_valid: req.query.q}
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const sort = {createdAt:req.query.sort};

        ServiceModel.find(q).populate('user_id')
        .sort(sort)
        .skip((page-1) * limit) //Notice here
        .limit(limit)
        .exec((err, doc) => {
            if (err) {
              return res.send(err);
            }
            ServiceModel.countDocuments(q).exec((count_error, count) => {
              if (err) {
                return res.send(count_error);
              }
              return res.status(200).send({
                total: count,
                success: true,
                message: "find all services !SUCCESS",
                page: page,
                sort: sort,
                pageSize: doc.length,
                services: doc
              });
            });
        });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

// FIND SERVICE BY ID 
const findServiceById = async (req, res) => {
    try {
        const service = await ServiceModel.findById({is_valid:true,_id:req.params.id}).populate('user_id');
        res.status(200).send({
            success: true,
            message: 'find service by id successFully',
            service: service
        });
    } catch (error) {
        res.json({success: false, message:error})
    }
}

// CREATE NEW SERVICE 
const createService = async (req, res) => {

    const bodyService = new ServiceModel({
        user_id     : req.body.user_id,
        departure   : req.body.departure,
        destination : req.body.destination,
        address_dest: req.body.address_dest,
        address_depart: req.body.address_depart,
        date_depart : req.body.date_depart,
        date_dest   : req.body.date_dest,
        image   : req.body.image,
        weight   : req.body.weight,
    });

    try {
        const newService =  await bodyService.save()
        res.send({
            success: true,
            message:'Service saved',
            newService
        });
        
    } catch (error) {
        res.send({success: false, message:error})
    } 
}

// UPDATE SERVICE 
const updateService = async (req, res) => {
    try {
        const serviceUpdated = await ServiceModel.updateOne(
            {_id:req.params.id},
            {
                $set:{
                    departure   : req.body.departure,
                    destination : req.body.destination,
                    address_dest: req.body.address_dest,
                    address_depart: req.body.address_depart,
                    date_depart : req.body.date_depart,
                    date_dest   : req.body.date_dest,
                    image       : req.body.image,
                    weight      : req.body.weight,
                },
            }
        );
        res.status(200).send({
            success: true,
            message:'Service updated successFully',
            serviceUpdated
        });
    } catch (error) {
        res.send({success: false, message:error})
    }
}

// DELETE SERVICE 
const deleteService = async (req, res) => {
    try {
        const serviceDelete = await ServiceModel.deleteOne({_id:req.params.id});
        res.send(
            {
                success:true,
                message:'SUCCESS! item deleted ',
                serviceDelete
            }
        );
    } catch (err) {
        res.send({success:false, message:err});
    }
}

module.exports = {
    findAllServices,
    findServiceById,
    createService,
    updateService,
    deleteService
}