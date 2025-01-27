const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifytoken');
require('dotenv').config();

const router = express.Router();

router.post('/get', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });

});
