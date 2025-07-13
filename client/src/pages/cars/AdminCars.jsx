import { Title } from "../../components/Title";
import { CarsTable } from "../../components/cars-table/CarsTable";

export function AdminCars() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='Cars for sale' />
                </div>
                <div className="col-12">
                    <CarsTable />
                </div>
            </div>
        </div>
    )
}