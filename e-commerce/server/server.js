const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./userModel');


const app = express();
const router = express.Router();

router.post('/api/user', async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        console.log(error);
    }
});

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(() => {
        console.log('mongooseconnected');
        app.listen(3001, () => {
            console.log('ghjihgyujh');
        });
    });