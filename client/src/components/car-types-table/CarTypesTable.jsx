import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

/*
GET: http/api/car-types                                                         ['type1', 'type2', 'type3']
GET: http/api/car-types/pavadinimas                                             {title: type1, size: 5, color: red}
DELETE: http/api/car-types/pavadinimas
POST: http/api/car-types + {title: type1, size: 5, color: red}
PUT:  http/api/car-types/pavadinimas + {title: type1, size: 5, color: red}
*/

export function CarTypesTable() {
     const { carTypes, deleteCarType } = useContext(GlobalContext);

    function deleteCarTypeHandler(title) {
        fetch('http://localhost:3001/api/car-types/' + title, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    deleteCarType(title);
                }
            })
            .catch();
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Car type</th>
                        <th className="text-end" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carTypes.map((carType, idx) => (
                            <tr key={carType}>
                                <td>{idx + 1}</td>
                                <td>{carType}</td>
                                <td className="d-flex gap-2 justify-content-end">
                                    <Link className="btn btn-primary btn-sm" to={`/car-types/${carType}/edit`}>Edit</Link>
                                    <button onClick={() => deleteCarTypeHandler(carType)} className="btn btn-danger btn-sm" type="button">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}