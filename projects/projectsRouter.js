const express = require('express');

const Project = require('./project-model');

const router = express.Router();

const Users = require("../users/users-model.js");

router.get('/', (req, res) => {
    // read the data from the database
    Project.find() // return a promise
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            // handle the error
            res.status(500).json({
                errorMessage: 'The Account information could not be retrieved.',
            });
        });
});

router.get('/read', (req, res) => {
    let id = req.token.subject;
    Project.findByUserId(id) 
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
                    // handle the error
            res.status(500).json({
                errorMessage: 'The Account information could not be retrieved.',
            });
        });
});

router.get('/read/:id', (req, res) => {
    const { id } = req.params;
    Project.findById(id)
        .then(data => {
            if (data.length != 0) {
                res.status(200).json(data);
            } else {
                return res.status(400).json({
                    errorMessage: "The Account with ID could not be retrieved."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: "The Account information could not be retrieved."
            });
        })
});

router.post('/', (req, res) => {
    let id = req.token.subject;
    const changes = req.body;
    changes.user_id = id;
    Project.add(changes)
        .then(data => {
            console.log(data);
            res.status(201).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: 'sorry, we ran into an error creating the Account',
            });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Project.update(req.params.id, changes)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: 'The Account information could not be modified.',
            });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Project.remove(id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: "The Account could not be removed"
            });
        });
});
module.exports = router;