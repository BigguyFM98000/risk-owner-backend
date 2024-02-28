const RiskownerModel = require('../models/risk_owner_model');

// Create and Save a new risk owner
exports.create = async (req, res) => {
    
    const riskowner = new RiskownerModel({
     
        name: req.body.name,
        title: req.body.title,
        email: req.body.email,
        role: req.body.role,
    });
    
    try {
       
        const data = await riskowner.save();
        res.send({
            message: "Risk owner added successfully!!",
            riskowner: data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while adding risk owner"
        });
    }
    
};

// Retrieve all risk owners from the database.
exports.findAll = async (req, res) => {
    try {
        const riskowner = await RiskownerModel.find();
        res.status(200).json(riskowner);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
};

// Find a single risk owner with an id
exports.findOne = async (req, res) => {
    try {
        const riskowner = await RiskownerModel.findById(req.params.id);
        res.status(200).json(riskowner);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update an employee by the id in the request
exports.update = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ message: "Data to update cannot be empty!" });
        } else {
            const id = req.params.id;
    
            // The { new: true } option in the findByIdAndUpdate() method is used to return the modified document to the then() function instead of the original.
            const data = await RiskownerModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    
            if (!data) {
                res.status(404).send({ message: `Risk owner not found.` });
            } else {
                res.send({ message: "Risk owner updated successfully." })
            }
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    
};

// Delete a risk owner with the specified id in the request
exports.destroy = async (req, res) => {
    try {
        const riskOwner = await RiskownerModel.findById(req.params.id);
        if (!riskOwner) {
            return res.status(404).send({ message: `Risk owner not found.` });
        }

        await RiskownerModel.findByIdAndDelete(req.params.id);
        res.send({ message: "Risk owner deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};