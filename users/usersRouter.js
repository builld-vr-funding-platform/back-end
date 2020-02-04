const express = require('express');

const Users = require('./users-model');

const router = express.Router();

router.get('/', (req, res) => {
    // read the data from the database
    Users.find() // return a promise
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


module.exports = router;