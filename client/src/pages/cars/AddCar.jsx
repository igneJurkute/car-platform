import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalContext";
import { Forbiden } from "../../components/error/Forbiden";
import { Title } from "../../components/Title";
import defaultImage from '../../assets/default-car-bg.png';

export function AddCar() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const { role, carTypes, steeringWheelSides } = useContext(GlobalContext);

    const [image, setImage] = useState('');
    const [imageErr, setImageErr] = useState('');
    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [price, setPrice] = useState(0);
    const [priceErr, setPriceErr] = useState('');
    const [color, setColor] = useState('');
    const [colorErr, setColorErr] = useState('');
    const [carType, setCarType] = useState('');
    const [carTypeErr, setCarTypeErr] = useState('');
    const [year, setYear] = useState(currentYear);
    const [yearErr, setYearErr] = useState('');
    const [steeringWheel, setSteeringWheel] = useState('');
    const [steeringWheelErr, setSteeringWheelErr] = useState('');
    const [location, setLocation] = useState('');
    const [locationErr, setLocationErr] = useState('');

    if (role !== 'seller') {
        return <Forbiden />;
    }

    function updateImage(e) {
        const formData = new FormData();
        formData.append('car_image', e.target.files[0]);

        fetch('http://localhost:3001/api/upload/car', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => setImage(`http://localhost:3001/${data.path}`))
            .catch(err => console.error(err));
    }

    function imageValidity() {
        if (image === '') {
            return 'Reikalinga nuotrauka.';
        }

        return '';
    }

    function titleValidity() {
        const maxSize = 100;

        if (title === '') {
            return 'Reikalingas pavadinimas.';
        }

        if (title.length > maxSize) {
            return `Per ilgas pavadinimas. Max leidziama ${maxSize} simboliai.`;
        }

        return '';
    }

    function priceValidity() {
        const min = 0;
        const max = 1_000_000;

        if (price < min) {
            return `Kaina negali buti mazesne uz ${min}.`;
        }

        if (price > max) {
            return `Kaina negali buti didesne uz ${max}.`;
        }

        return '';
    }

    function colorValidity() {
        const maxSize = 20;

        if (color === '') {
            return 'Reikalinga spalva.';
        }

        if (color.length > maxSize) {
            return `Spalvos pavadinimas negali virsyti ${maxSize} simbliu.`;
        }

        return '';
    }

    function carTypeValidity() {
        if (!carTypes.includes(carType)) {
            return 'Reikia nurodyti kebulo tipa.';
        }

        return '';
    }

    function yearValidity() {
        const min = 1886;
        const max = new Date().getFullYear();

        if (year < min || year > max) {
            return 'Negali nurodyti metu, kuriai nebuvo gaminami automobiliai.';
        }

        return '';
    }

    function steeringWheelValidity() {
        if (!steeringWheelSides.includes(steeringWheel)) {
            return 'Reikia nurodyti kurioje puseje yra vairas, jei jis yra.';
        }

        return '';
    }

    function locationValidity() {
        const maxSize = 100;

        if (location === '') {
            return 'Reikia nurodyti vietove.';
        }

        if (location.length > maxSize) {
            return `Per ilgas vietoves pavadinimas. Max leidziama ${maxSize} simboliai.`;
        }

        return '';
    }

    function isValidForm() {
        const imageMsg = imageValidity();
        setImageErr(imageMsg);

        const titleMsg = titleValidity();
        setTitleErr(titleMsg);

        const priceMsg = priceValidity();
        setPriceErr(priceMsg);

        const colorMsg = colorValidity();
        setColorErr(colorMsg);

        const carTypeMsg = carTypeValidity();
        setCarTypeErr(carTypeMsg);

        const yearMsg = yearValidity();
        setYearErr(yearMsg);

        const steeringWheelMsg = steeringWheelValidity();
        setSteeringWheelErr(steeringWheelMsg);

        const locationMsg = locationValidity();
        setLocationErr(locationMsg);

        return !imageMsg && !titleMsg && !priceMsg && !colorMsg && !carTypeMsg
            && !yearMsg && !steeringWheelMsg && !locationMsg;
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!isValidForm()) {
            return;
        }

        fetch('http://localhost:3001/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                image, title, price, color, carType,
                year, steeringWheel, location
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    navigate('/cars');
                }
            })
            .catch(console.error);
    }

    const defaultImageStyle = {
        height: 300,
        objectFit: 'cover',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };
    const imageStyle = {
        height: 300,
        objectFit: 'contain',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title="New car" />
                </div>
                <form onSubmit={submitHandler} className="col-12 col-sm-8">
                    <div className="row mb-3">
                        <img src={image ? image : defaultImage} alt="Car" className="col-12 p-0 mb-3"
                            style={image ? imageStyle : defaultImageStyle} />
                        <label className="col-12 col-md-4 form-label" htmlFor="image">Image</label>
                        <div className="col-12 col-md-8">
                            <input onChange={updateImage} type="file"
                                className={`form-control ${imageErr ? 'is-invalid' : ''}`} id="image" />
                            <div className="invalid-feedback">{imageErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="title">Title</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setTitle(e.target.value)} value={title} type="text"
                                className={`form-control ${titleErr ? 'is-invalid' : ''}`} id="title" />
                            <div className="invalid-feedback">{titleErr}</div>
                            <small className="text-body-secondary">Example: Mano 4 ratai</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="price">Price</label>
                        <div className="col-12 col-md-8">
                            <div className="input-group">
                                <input onChange={e => setPrice(+e.target.value)} value={price} type="number"
                                    className={`form-control ${priceErr ? 'is-invalid' : ''}`} id="price" min={0} max={1_000_000} step={1} />
                                <span className="input-group-text">EUR</span>
                                <div className="invalid-feedback">{priceErr}</div>
                            </div>
                            <small className="text-body-secondary">Kaina nurodoma be centu</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="color">Color</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setColor(e.target.value)} value={color} type="text"
                                className={`form-control ${colorErr ? 'is-invalid' : ''}`} id="color" />
                            <div className="invalid-feedback">{colorErr}</div>
                            <small className="text-body-secondary">Example: Raudona</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="carType">Type</label>
                        <div className="col-12 col-md-8">
                            <select className={`form-select ${carTypeErr ? 'is-invalid' : ''}`}
                                onChange={e => setCarType(e.target.value)} value={carType} id="carType">
                                <option value="None">- Select</option>
                                {carTypes.map(ct =>
                                    <option key={ct} value={ct}>{ct}</option>
                                )}
                            </select>
                            <div className="invalid-feedback">{carTypeErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="year">Year</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setYear(e.target.value)} value={year} type="number"
                                className={`form-control ${yearErr ? 'is-invalid' : ''}`} id="year" min={1886} max={currentYear} step={1} />
                            <div className="invalid-feedback">{yearErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="steeringWheel">Steering wheel</label>
                        <div className="col-12 col-md-8">
                            <select className={`form-select ${steeringWheelErr ? 'is-invalid' : ''}`} onChange={e => setSteeringWheel(e.target.value)}
                                value={steeringWheel} id="steeringWheel">
                                <option value="None">- Select</option>
                                {steeringWheelSides.map(ct =>
                                    <option key={ct} value={ct}>{ct}</option>
                                )}
                            </select>
                            <div className="invalid-feedback">{steeringWheelErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="location">Location</label>
                        <div className="col-12 col-md-8">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaMapMarkerAlt />
                                </span>
                                <input onChange={e => setLocation(e.target.value)} value={location} type="text"
                                    className={`form-control ${locationErr ? 'is-invalid' : ''}`} id="location" />
                                <div className="invalid-feedback">{locationErr}</div>
                            </div>
                            <small className="text-body-secondary">Miesto pavadinimas ir/ar pilnas adresas</small>
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-primary py-2" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}