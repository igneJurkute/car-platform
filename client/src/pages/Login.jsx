import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

export function Login() {
    const { updateEmail, updateFullname, updateLoginStatus, updateRole } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function emailUpdateHandler(e) {
        setEmail(e.target.value);
    }

    function passwordUpdateHandler(e) {
        setPassword(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        if (email && password) {
            fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        updateLoginStatus(true);
                        updateEmail(data.user.email);
                        updateFullname(data.user.fullname);
                        updateRole(data.user.role);
                        navigate('/dashboard');
                    }
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={submitHandler} className="col-12 col-sm-8 col-md-6 col-lg-4 m-auto">
                    <h1 className="h3 mb-3 fw-normal">Please login</h1>

                    <div className="form-floating mb-3">
                        <input onChange={emailUpdateHandler} value={email} type="email" className="form-control" id="email" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={passwordUpdateHandler} value={password} type="password" className="form-control" id="password" placeholder="Password" />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}