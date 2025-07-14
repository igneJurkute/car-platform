import express from 'express';
import { connection } from '../setupDb.js';

export const cars = express.Router();

// cars.post('/', async (req, res) => {
//     const { title } = req.body;

//     if (!title) {
//         return res.status(400).json({
//             status: 'err',
//             msg: 'Car type could not be created. Provide "title" value.',
//         });
//     }

//     try {
//         const selectQuery = `SELECT * FROM \`car-types\` WHERE title = ?;`;
//         const selectRes = await connection.execute(selectQuery, [title]);
//         const carTypes = selectRes[0];

//         if (carTypes.length > 0) {
//             return res.status(200).json({
//                 status: 'err-list',
//                 errors: [
//                     {
//                         input: 'carType',
//                         msg: 'Such car type already exists.',
//                     }
//                 ]
//             });
//         }

//         const insertQuery = `INSERT INTO \`car-types\` (title) VALUES (?)`;
//         const insertRes = await connection.execute(insertQuery, [title]);
//         const insertResObject = insertRes[0];

//         if (insertResObject.insertId > 0) {
//             return res.status(200).json({
//                 status: 'ok',
//                 msg: 'Car type created',
//             });
//         } else {
//             return res.status(400).json({
//                 status: 'err',
//                 msg: 'Car type could not be created',
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             status: 'err',
//             msg: 'POST: CAR TYPES API - server error.',
//         });
//     }
// });

cars.get('/', async (req, res) => {
    const role = req.user.role;
    let selectQuery = '';

    if (role === 'admin') {
        selectQuery = `SELECT * FROM cars;`;
    } else if (role === 'seller') {
        selectQuery = `SELECT * FROM cars WHERE user_id = ?;`;
    } else {
        return res.status(403).json({
            status: 'err',
            msg: 'Forbiden.',
        });
    }

    try {
        const selectRes = await connection.execute(selectQuery, [req.user.id]);
        const carTypes = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            list: carTypes,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: CAR TYPES API - server error.',
        });
    }
});

// cars.delete('/:title', async (req, res) => {
//     const { title } = req.params;

//     try {
//         const deleteQuery = `DELETE FROM \`car-types\` WHERE title = ?;`;
//         const deleteRes = await connection.execute(deleteQuery, [title]);
//         const carTypes = deleteRes[0];

//         if (carTypes.affectedRows > 0) {
//             return res.status(200).json({
//                 status: 'ok',
//                 msg: 'Car type deleted.',
//             });
//         } else {
//             return res.status(400).json({
//                 status: 'err',
//                 msg: 'There was nothing to delete.',
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             status: 'err',
//             msg: 'DELETE: CAR TYPES API - server error.',
//         });
//     }
// });

// cars.put('/:oldTitle', async (req, res) => {
//     const { oldTitle } = req.params;
//     const { newTitle } = req.body;
//     console.log(oldTitle, newTitle);

//     if (!oldTitle || !newTitle) {
//         return res.status(400).json({
//             status: 'err',
//             msg: 'Car type could not be created. Provide "title" values.',
//         });
//     }

//     try {
//         const selectQuery = `SELECT * FROM \`car-types\` WHERE title = ?;`;
//         const selectRes = await connection.execute(selectQuery, [newTitle]);
//         const carTypes = selectRes[0];

//         if (carTypes.length > 0) {
//             return res.status(200).json({
//                 status: 'err-list',
//                 errors: [
//                     {
//                         input: 'carType',
//                         msg: 'Such car type already exists.',
//                     }
//                 ]
//             });
//         }

//         const updateQuery = `UPDATE \`car-types\` SET title = ? WHERE title = ?`;
//         const updateRes = await connection.execute(updateQuery, [newTitle, oldTitle]);
//         const updateResObject = updateRes[0];

//         if (updateResObject.affectedRows > 0) {
//             return res.status(200).json({
//                 status: 'ok',
//                 msg: 'Car type updated.',
//             });
//         } else {
//             return res.status(400).json({
//                 status: 'err',
//                 msg: 'Car type could not be updated.',
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             status: 'err',
//             msg: 'PUT: CAR TYPES API - server error.',
//         });
//     }
// });

cars.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Car types" method' });
});