import React, { useContext } from "react";
import { Context} from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const SpecieDetails = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/species");
    };

    if (!store.currentSpecie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="row">
            <div className="col d-flex justify-content-center">
                <div className="card m-5" style={{ width: "25rem" }}>
                    <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/species/${store.specieUid}.jpg`} alt="Specie" />
                    <div className="card-body">
                        <ul>
                            <li>Classification: {store.currentSpecie.classification}</li>
                            <li>Designation: {store.currentSpecie.designation}</li>
                            <li>Language: {store.currentSpecie.language}</li>
                            <li>Avg Lifespan: {store.currentSpecie.average_lifespan}</li>
                            <li>Avg Height: {store.currentSpecie.average_height}</li>
                            <li>Hair Color(s): {store.currentSpecie.hair_colors}</li>
                            <li>Skin Color(s): {store.currentSpecie.skin_colors}</li>
                            <li>Eye Color(s): {store.currentSpecie.eye_colors}</li>
                        </ul>
                        <button className="btn btn-secondary ms-2" onClick={handleCancel}>Return</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
