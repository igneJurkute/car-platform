import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

export function CarsTable() {
    const { cars, updateCars } = useContext(GlobalContext);

   useEffect(() => {
        fetch('http://localhost:3001/api/cars/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    updateCars(data.list);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th className="text-end" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cars.map((car, idx) => (
                            <tr key={car.title + idx}>
                                <td>{idx + 1}</td>
                                <td>{car.title}</td>
                                <td className="d-flex gap-2 justify-content-end">
                                    <Link className="btn btn-primary btn-sm" to={`/cars/${car.title}/edit`}>Edit</Link>
                                    {/* <button onClick={() => deleteCarTypeHandler(car)} className="btn btn-danger btn-sm" type="button">Delete</button> */}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}