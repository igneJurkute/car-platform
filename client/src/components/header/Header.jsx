import { Link } from "react-router-dom";

export function Header() {
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <span className="fs-4">Logo</span>
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to="/" className="nav-link active" aria-current="page">Home</Link></li>
                    <li className="nav-item"><Link to="/list" className="nav-link">List</Link></li>
                    <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                    <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
                </ul>
            </header>
        </div>
    );
}