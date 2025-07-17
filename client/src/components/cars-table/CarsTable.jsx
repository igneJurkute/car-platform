import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

export function CarsTable({ filterCarType, filterTitle }) {
  const { cars, updateCars } = useContext(GlobalContext);

  useEffect(() => {
    fetch("http://localhost:3001/api/cars/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          updateCars(data.list);
        }
      })
      .catch(console.error);
  }, []);

  const imageStyle = {
    width: 100,
    height: 50,
    objectFit: "container",
    objectPosition: "center",
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Location</th>
            <th scope="col">Type</th>
            <th className="text-end" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {cars
            .filter((car) =>
              filterCarType === "All" ? true : car.carType === filterCarType
            )
            .filter((car) =>
              filterTitle === ""
                ? true
                : car.title.toLowerCase().includes(filterTitle)
            )
            .map((car, idx) => (
              <tr key={car.title + idx}>
                <td>{idx + 1}</td>
                <td>
                  <img style={imageStyle} src={car.image} alt="Car" />
                </td>
                <td>{car.title}</td>
                <td>{car.price}</td>
                <td>{car.location}</td>
                <td>{car.carType}</td>
                <td>
                  <div className="d-flex gap-2 justify-content-end">
                    <Link
                      className="btn btn-primary btn-sm"
                      to={`/cars/${car.id}/edit`}
                    >
                      Edit
                    </Link>
                    {/* <button onClick={() => deleteCarTypeHandler(car)} className="btn btn-danger 
                    btn-sm" type="button">Delete</button> */}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
