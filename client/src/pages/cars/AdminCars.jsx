import { useContext, useState } from "react";
import { Title } from "../../components/Title";
import { CarsTable } from "../../components/cars-table/CarsTable";
import { GlobalContext } from "../../context/GlobalContext";

export function AdminCars() {
    const { carTypes } = useContext(GlobalContext);
    const [selectedCarType, setSelectedCarType] = useState('All');
    const [title, setTitle] = useState('');

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='Cars for sale' />
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6 col-sm-4 col-md-3">
                            <select className=" form-select"
                                onChange={e => setSelectedCarType(e.target.value)}>
                                <option value="All">All</option>
                                {carTypes.map(ct => (
                                    <option key={ct} value={ct}>{ct}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6 col-sm-4 col-md-3">
                            <input type="text" className="form-control" value={title}
                                onChange={e => setTitle(e.target.value)} />
                        </div>

                    </div>
                </div>
                <div className="col-12">
                    <CarsTable filterCarType={selectedCarType} filterTitle={title.toLowerCase()} />
                </div>
            </div>
        </div>
    )
}