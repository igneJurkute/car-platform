import { useContext, useState } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { Forbiden } from "../../components/error/Forbiden";
import { Title } from "../../components/Title";
import { Link, useNavigate, useParams } from "react-router-dom";

export function AdminEditCarType() {
    const { carType } = useParams();
    const navigate = useNavigate();
    const { role, changeCarType } = useContext(GlobalContext);
    const [text, setText] = useState(carType);

    if (role !== 'admin') {
        return <Forbiden />;
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!text) {
            return;
        }

        fetch('http://localhost:3001/api/car-types/' + carType, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newTitle: text }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    changeCarType(carType, text);
                    navigate('/car-types');
                }
            })
            .catch(console.error);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title="Edit car type" />
                </div>
                <form onSubmit={submitHandler} className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="carType">Car type</label>
                        <input onChange={e => setText(e.target.value)} value={text} type="text" className="form-control" id="carType" />
                    </div>

                    <button className="btn btn-primary py-2" type="submit">Update</button>
                    <Link className="btn btn btn-outline-secondary py-2" to="/car-types">Cancel</Link>
                </form>
            </div>
        </div>
    )
}