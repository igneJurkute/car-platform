import { Link } from 'react-router-dom';

export function CarTypesTable() {
    return (
        <table>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Pavadinimas 1</td>
                    <td>
                        <Link to='/car-types/pavadinimas-1'>Edit</Link>
                        <button type='button'>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Pavadinimas 2</td>
                    <td>
                        <Link to='/car-types/pavadinimas-2'>Edit</Link>
                        <button type='button'>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Pavadinimas 3</td>
                    <td>
                        <Link to='/car-types/pavadinimas-3'>Edit</Link>
                        <button type='button'>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Pavadinimas 4</td>
                    <td>
                        <Link to='/car-types/pavadinimas-4'>Edit</Link>
                        <button type='button'>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Pavadinimas 5</td>
                    <td>
                        <Link to='/car-types/pavadinimas-5'>Edit</Link>
                        <button type='button'>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}