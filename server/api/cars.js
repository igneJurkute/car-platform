import express from 'express';
import { connection } from '../setupDb.js';

export const cars = express.Router();

cars.post('/', async (req, res) => {
    const { role, id } = req.user;

    if (role !== 'seller') {
        return res.status(400).json({
            status: 'err',
            msg: 'You are not a seller.',
        });
    }

    const { image, title, price, color, carType,
        year, steeringWheel, location } = req.body;

    if (!title) {
        return res.status(400).json({
            status: 'err',
            msg: 'Car could not be created. Provide "title" value.',
        });
    }

    if (!image) {
        return res.status(400).json({
            status: 'err',
            msg: 'Car could not be created. Provide "image" value.',
        });
    }

    if (!price) {
        return res.status(400).json({
            status: 'err',
            msg: 'Car could not be created. Provide "price" value.',
        });
    }

    if (!color) {
        return res.status(400).json({
            status: 'err',
            msg: 'Car could not be created. Provide "color" value.',
        });
    }

    if (!carType) {
        return res.status(400).json({
            status: 'err',
            msg: 'Car could not be created. Provide "carType" value.',
        });
    }

    if (!year) {
        return res.status(400).json({
            status: 'err',
            msg: 'Car could not be created. Provide "year" value.',
        });
    }

    if (!steeringWheel) {
        return res.status(400).json({
            status: 'err',
            msg: 'Car could not be created. Provide "steeringWheel" value.',
        });
    }

    if (!location) {
        return res.status(400).json({
            status: 'err',
            msg: 'Car could not be created. Provide "location" value.',
        });
    }

    try {
        const carTypeQuery = `SELECT id FROM \`car-types\` WHERE title = ?`;
        const carTypeRes = await connection.execute(carTypeQuery, [carType]);
        const carTypeResArray = carTypeRes[0];

        if (carTypeResArray.length < 1) {
            return res.status(400).json({
                status: 'err',
                msg: 'Car type value is invalid.',
            });
        }

        const carTypeId = carTypeResArray[0].id;

        const steeringWheelQuery = `SELECT id FROM \`steering-wheel\` WHERE side = ?`;
        const steeringWheelRes = await connection.execute(steeringWheelQuery, [steeringWheel]);
        const steeringWheelResArray = steeringWheelRes[0];

        if (steeringWheelResArray.length < 1) {
            return res.status(400).json({
                status: 'err',
                msg: 'Car steering wheel value is invalid.',
            });
        }

        const steeringWheelId = steeringWheelResArray[0].id;

        const insertQuery = `INSERT INTO cars
            (user_id, car_type_id, title, color, price, year, steering_wheel_id, location, mileage, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const insertRes = await connection.execute(insertQuery,
            [id, carTypeId, title, color, price, year, steeringWheelId, location, 0, image]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            return res.status(201).json({
                status: 'ok',
                msg: 'Car created',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Car could not be created',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'err',
            msg: 'POST: CAR TYPES API - server error.',
        });
    }
});

cars.get('/', async (req, res) => {
    const role = req.user.role;
    let selectQuery = '';

    if (role === 'admin') {
        selectQuery = `SELECT cars.id, cars.title, \`car-types\`.title as carType, cars.image, 
                            cars.price, cars.color, cars.location
                        FROM cars
                        INNER JOIN \`car-types\` ON \`car-types\`.id = cars.car_type_id;`;
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

cars.get('/:carId', async (req, res) => {
    const { carId } = req.params;

    try {
        const selectQuery = `SELECT cars.id, cars.title, \`car-types\`.title as carType, cars.image, 
                                cars.price, cars.color, cars.location, \`steering-wheel\`.side as steeringWheel
                            FROM cars
                            INNER JOIN \`car-types\` ON \`car-types\`.id = cars.car_type_id
                            INNER JOIN \`steering-wheel\` ON \`steering-wheel\`.id = cars.steering_wheel_id
                            WHERE cars.id = ?;`;
        const selectRes = await connection.execute(selectQuery, [carId]);
        const cars = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            car: cars[0],
        });
    } catch (error) {
        console.log(error);
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
    return res.status(404).json({ msg: 'Unsupported "Cars" method' });
});