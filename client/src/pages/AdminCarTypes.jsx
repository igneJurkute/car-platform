import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { Forbiden } from "../components/error/Forbiden";
import { CarTypesTable } from "../components/car-types-table/CarTypesTable";
import { Link } from "react-router-dom";

export function AdminCarTypes() {
    const { role } = useContext(GlobalContext);

    if (role !== 'admin') {
        return <Forbiden />;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Link to="/car-types/new">Create new</Link>
                </div>
                <div className="col-12">
                    <CarTypesTable />
                </div>
            </div>
        </div>
    )
}