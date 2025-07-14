import express from 'express';
import { register } from './register.js';
import { login } from './login.js';
import { logout } from './logout.js';
import { carTypes } from './car-types.js';
import { users } from './users.js';
import { cars } from './cars.js';

export const api = express.Router();

api.all('/', (req, res) => {
    return res.json({
        msg: 'Incomplete URL',
    });
});

api.use('/register', register);
api.use('/login', login);
api.use('/logout', logout);
api.use('/car-types', carTypes);
api.use('/users', users);
api.use('/cars', cars);