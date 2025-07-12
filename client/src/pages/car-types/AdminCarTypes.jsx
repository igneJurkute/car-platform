import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { Forbiden } from "../../components/error/Forbiden";
import { CarTypesTable } from "../../components/car-types-table/CarTypesTable";
import { Title } from "../../components/Title";

export function AdminCarTypes() {
    const { role } = useContext(GlobalContext);

    if (role !== 'admin') {
        return <Forbiden />;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='Car types' uri="/car-types/new" />
                </div>
                <div className="col-12">
                    <CarTypesTable />
                </div>
            </div>
        </div>
    )
}