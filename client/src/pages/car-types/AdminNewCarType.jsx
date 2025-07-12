import { useContext, useState } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { Forbiden } from "../../components/error/Forbiden";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";

export function AdminNewCarType() {
    const navigate = useNavigate();
    const { role, addCarType } = useContext(GlobalContext);
    const [text, setText] = useState('');

    if (role !== 'admin') {
        return <Forbiden />;
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!text) {
            return;
        }

        fetch('http://localhost:3001/api/car-types', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ title: text })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    addCarType(text);
                    navigate('/car-types');
                }
            })
            .catch(console.error);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title="New car type" />
                </div>
                <form onSubmit={submitHandler} className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="carType">Car type</label>
                        <input onChange={e => setText(e.target.value)} value={text} type="text" className="form-control" id="carType" />
                    </div>

                    <button className="btn btn-primary py-2" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}