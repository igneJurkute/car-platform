import { createContext, useEffect, useState } from 'react';

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    role: 'public',
    updateRole: () => { },
    fullname: '',
    updateFullname: () => { },
    email: '',
    updateEmail: () => { },
    carTypes: [],
    addCarType: () => { },
    deleteCarType: () => { },
    changeCarType: () => { },
    updateCarTypes: () => { },
    cars: [],
    updateCars: () => { },
};

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [role, setRole] = useState(initialContext.role);
    const [fullname, setFullname] = useState(initialContext.fullname);
    const [email, setEmail] = useState(initialContext.email);
    const [carTypes, setCarTypes] = useState(initialContext.carTypes);
    const [cars, setCars] = useState(initialContext.cars);

    // User busena: role, email, ....

    useEffect(() => {
        fetch('http://localhost:3001/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.user) {
                    setLoginStatus(true);
                    setRole(data.user.role);
                    setFullname(data.user.fullname);
                    setEmail(data.user.email);
                }
            })
            .catch(console.error);
    }, []);

    // Pradinis automobiliu tipu masyvas
    useEffect(() => {
        fetch('http://localhost:3001/api/car-types', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.list) {
                    setCarTypes(data.list.map(t => t.title));
                }
            })
            .catch(console.error);
    }, []);

    function updateLoginStatus(status) {
        setLoginStatus(status);
    }

    function updateRole(role) {
        const allowedRoles = ['public', 'admin', 'seller'];
        if (allowedRoles.includes(role)) {
            setRole(role);
        }
    }

    function updateFullname(fullname) {
        setFullname(fullname);
    }

    function updateEmail(email) {
        setEmail(email);
    }

     function updateCarTypes(carTypes) {
        setCarTypes(carTypes);
    }

    function addCarType(carType) {
        setCarTypes(pre => [...pre, carType]);
    }

    function deleteCarType(carType) {
        setCarTypes(pre => pre.filter(title => title !== carType));
    }

    function changeCarType(oldCarType, newCarType) {
        setCarTypes(pre => pre.map(title => title === oldCarType ? newCarType : title));
    }

     function updateCars(cars) {
        setCars(cars);
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        role,
        updateRole,
        fullname,
        updateFullname,
        email,
        updateEmail,
        carTypes,
        addCarType,
        deleteCarType,
        changeCarType,
        updateCarTypes,
        cars,
        updateCars,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};