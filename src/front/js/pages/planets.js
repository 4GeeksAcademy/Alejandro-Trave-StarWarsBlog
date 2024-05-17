import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Planets = () => {
    const { store, actions } = useContext(Context);
    const [favs, setFavs] = useState(Array(store.planets.length).fill('regular'));

    useEffect(() => {
        const favStatus = store.planets.map(planet =>
            store.favorites.some(fav => fav.id === planet.uid && fav.type === 'planet') ? 'solid' : 'regular'
        );
        setFavs(favStatus);
    }, [store.planets, store.favorites]);

    const getCurrentPlanet = (planetUrl) => {
        actions.getCurrentPlanet(planetUrl);
    }

    const handleFavorite = (index, planet) => {
        actions.addFavoritePlanet(planet);
        toggleFav(index);
    }

    const toggleFav = (index) => {
        const newFavs = [...favs];
        newFavs[index] = newFavs[index] === 'regular' ? 'solid' : 'regular';
        setFavs(newFavs);
    }
    
    return (
        <div className="container-fluid">
            <div className="row">
                {store.planets.map((planet, index) => (
                    <div key={planet.uid} className="col-12 col-sm-6 col-md-3 d-flex align-items-stretch">
                        <div className="card m-3" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={
                                planet.uid === "1"
                                    ? "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357"
                                    : `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`
                            } alt={`Planet ${index}`} />
                            <div className="card-body">
                                <h5 className="card-title">{planet.name}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <Link to='/planetsDetails' className="btn btn-outline-dark me-5" onClick={() => getCurrentPlanet(planet.url)}>Ver Detalles</Link>
                                <div className="float-end">
                                <button onClick={() => handleFavorite(index, planet)}>
                                        <i className={`${favs[index] === 'solid' ? 'fas' : 'far'} fa-heart`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
