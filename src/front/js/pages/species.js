import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Species = () => {
    const { store, actions } = useContext(Context);

    const [favs, setFavs] = useState(Array(store.planets.length).fill('regular'));

    useEffect(() => {
        const favStatus = store.species.map(specie =>
            store.favorites.some(fav => fav.id === specie.uid && fav.type === 'specie') ? 'solid' : 'regular'
        );
        setFavs(favStatus);
    }, [store.species, store.favorites]);

    const handleFavorite = (index, specie) => {
        actions.addFavoriteSpecie(specie);
        toggleFav(index);
    }

    const toggleFav = (index) => {
        const newFavs = [...favs];
        newFavs[index] = newFavs[index] === 'regular' ? 'solid' : 'regular';
        setFavs(newFavs);
    }

    const getCurrentSpecie = (specieUrl) => {
        actions.getCurrentSpecie(specieUrl);
    }

    /*  const toggleFav = (index) => {
         const newFavs = [...favs];
         newFavs[index] = newFavs[index] === 'regular' ? 'solid' : 'regular';
         setFavs(newFavs);
     } */

    return (
        <div className="row">
            {store.species.map((specie, index) => (
                <div key={specie.uid} className="col">
                    <div className="card m-3" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/species/${specie.uid}.jpg`
                        } alt={`Specie ${index}`} />
                        <div className="card-body">
                            <h5 className="card-title">{specie.name}</h5>     
                            <Link to='/specieDetails' className="btn btn-outline-dark me-5" onClick={() => getCurrentSpecie(specie.url)}>Ver Detalles</Link>
                            <div className="float-end">
                            <button onClick={() => handleFavorite(index, specie)}>
                                        <i className={`${favs[index] === 'solid' ? 'fas' : 'far'} fa-heart`}></i>
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
