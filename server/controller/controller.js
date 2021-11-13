var TopicModel = require('../model/topic');
var UserModel = require('../model/user');
var IdeaModel = require('../model/idea');

const bcrypt = require('bcrypt');
const { default: Axios } = require('axios');
// create and save new topic
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new topic
    const topic = new TopicModel({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save topic in the database
    topic
        .save(topic)
        .then(data => {
            res.send(data)
            res.redirect('/add-topic');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all topics/ retrive and return a single topic
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        TopicModel.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found topic with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving topic with id " + id })
            })

    } else {
        TopicModel.find()
            .then(topic => {
                res.send(topic)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving topic information" })
            })
    }


}

exports.findUser = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        UserModel.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found topic with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving topic with id " + id })
            })

    } else {
        UserModel.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retrieving user information" })
            })
    }


}



// Update a new idetified topic by topic id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    TopicModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update topic with ${id}. Maybe topic not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update topic information" })
        })
}

// Delete a topic with specified topic id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TopicModel.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "topic was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete topic with id=" + id
            });
        });
}
exports.login = async (req, res) => {
    if (!req.body) {
        res.status(401).send({ message: 'Empty login form !!' })
        return;
    }
    UserModel.findOne({email: req.body.email})
    .then(user=>{
        if (!user) res.status(404).json({error: 'no user with that email found'})
        else if (req.body.password === user.password) {
         res.status(200);
         res.redirect('/')   
        }
        else res.status(403).json({error: 'passwords do not match'})
    })

}
exports.register = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // validate request

    // new user
    const user = new UserModel({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    })

    user
        .save(user)
        .then(data => {
            res.redirect('/login');
            res.send(data)
            res.status(200)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });


}