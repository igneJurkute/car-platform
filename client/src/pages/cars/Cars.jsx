import { useContext } from 'react';
import { AdminCars } from './AdminCars';
import { SellerCars } from './SellerCars';
import { GlobalContext } from '../../context/GlobalContext';
import { Forbiden } from '../../components/error/Forbiden';

export function Cars() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminCars />;
    }

    if (role === 'seller') {
        return <SellerCars />;
    }

    return <Forbiden />;
}