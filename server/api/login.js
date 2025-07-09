import { randomUUID } from 'crypto';
import express from 'express';
import { connection } from '../setupDb.js';
import { hash } from '../lib/hash.js';

export const login = express.Router();

login.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ? AND password_hash = ?;`;
        const selectRes = await connection.execute(selectQuery, [email, hash(password)]);
        const users = selectRes[0];

        if (users.length === 0) {
            return res.status(200).json({
                status: 'err',
                msg: 'User with such email and password does not exist.',
            });
        }

        const token = randomUUID();

        const insertQuery = `INSERT INTO tokens (token, user_id) VALUES (?, ?)`;
        const insertRes = await connection.execute(insertQuery, [token, users[0].id]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            const cookie = [
                'autoToken=' + token,
                'path=/',
                'domain=localhost',
                'max-age=86400',
                // 'Secure',
                'SameSite=Lax',
                'HttpOnly',
            ];
            return res.status(200).set('Set-Cookie', cookie.join('; ')).json({
                status: 'ok',
                msg: 'Token created',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Token could not be created',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: LOGIN API - server error.',
        });
    }
});

login.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Login" method' });
});