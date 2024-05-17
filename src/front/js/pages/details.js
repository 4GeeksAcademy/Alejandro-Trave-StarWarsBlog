import React, { useContext } from "react";
import { Context} from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Details = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/characters");
    };

    if (!store.currentCharacter) {
        return <div>Loading...</div>;
    }

    return (
        <div className="row">
            <div className="col d-flex justify-content-center">
                <div className="card m-5" style={{ width: "25rem" }}>
                    <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/characters/${store.currentUid}.jpg`} alt="Planet" />
                    <div className="card-body">
                        <ul>
                            <li>Height: {store.currentCharacter.height}</li>
                            <li>Mass: {store.currentCharacter.mass}</li>
                            <li>Hair color: {store.currentCharacter.hair_color}</li>
                            <li>Skin color: {store.currentCharacter.skin_color}</li>
                            <li>Eye color: {store.currentCharacter.eye_color}</li>
                            <li>Birth year: {store.currentCharacter.birth_year}</li>
                            <li>Gender: {store.currentCharacter.gender}</li>
                        </ul>
                        <button className="btn btn-secondary ms-2" onClick={handleCancel}>Return</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
