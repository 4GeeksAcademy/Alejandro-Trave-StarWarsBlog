import React, { useContext } from "react";
import { Context} from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const PlanetDetails = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/planets");
    };

    if (!store.currentPlanet) {
        return <div>Loading...</div>;
    }

    return (
        <div className="row">
            <div className="col d-flex justify-content-center">
                <div className="card m-5" style={{ width: "25rem" }}>
                    <img className="card-img-top" src={
                                store.planetUid === "1"
                                    ? "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357"
                                    : `https://starwars-visualguide.com/assets/img/planets/${store.planetUid}.jpg`
                            } alt='Planet' />
                    <div className="card-body">
                        <ul>
                            <li>Diameter: {store.currentPlanet.diameter}</li>
                            <li>Rotation_period: {store.currentPlanet.rotation_period}</li>
                            <li>Orbital_period: {store.currentPlanet.orbital_period}</li>
                            <li>Gravity: {store.currentPlanet.gravity}</li>
                            <li>population: {store.currentPlanet.population}</li>
                            <li>climate: {store.currentPlanet.climate}</li>
                            <li>terrain: {store.currentPlanet.terrain}</li>
                            <li>Surface_water: {store.currentPlanet.surface_water}</li>
                        </ul>
                        <button className="btn btn-secondary ms-2" onClick={handleCancel}>Return</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
