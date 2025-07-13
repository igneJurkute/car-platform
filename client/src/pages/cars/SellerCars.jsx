import { Title } from "../../components/Title";
import { CarsTable } from "../../components/cars-table/CarsTable";

export function SellerCars() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='My cars for sale' uri="/cars/new" />
                </div>
                <div className="col-12">
                    <CarsTable />
                </div>
            </div>
        </div>
    )
}