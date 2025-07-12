import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

export function Header() {
    const { role, updateEmail, updateFullname, updateLoginStatus, updateRole } = useContext(GlobalContext);
    const navigate = useNavigate();

    function logMeOut() {
        fetch('http://localhost:3001/api/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(() => {
                updateLoginStatus(false);
                updateEmail('');
                updateFullname('');
                updateRole('public');
                navigate('/');
            })
            .catch(console.error);
    }

    const publicLinks = <>
        <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
        <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
    </>;

    const adminLinks = <>
        <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        <li className="nav-item"><Link to="/car-types" className="nav-link">Car types</Link></li>
        <li className="nav-item"><button onClick={logMeOut} className="nav-link" type="button">Logout</button></li>
    </>;

    const sellerLinks = <>
        <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        <li className="nav-item"><button onClick={logMeOut} className="nav-link" type="button">Logout</button></li>
    </>;

    let extraLinks = <></>;
    if (role === 'admin') {
        extraLinks = adminLinks;
    } else if (role === 'seller') {
        extraLinks = sellerLinks;
    } else {
        extraLinks = publicLinks;
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <span className="fs-4">Logo</span>
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to="/" className="nav-link" aria-current="page">Home</Link></li>
                    <li className="nav-item"><Link to="/list" className="nav-link">List</Link></li>
                    {extraLinks}
                </ul>
            </header>
        </div>
    );
}