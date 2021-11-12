var TopicModel = require('../model/topic');
var UserModel = require('../model/user');
var IdeaModel = require('../model/idea');

const bcrypt = require('bcrypt')
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
exports.login = (req, res) => {

}

exports.register = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
    } catch (error) {

    }
    // validate request

    // new user
    const user = new UserModel({
        user: req.body.name,
        password: req.body.password,
        role: req.body.role,
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            console.log('data',data)
            res.send(data)
            res.redirect('/login');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}