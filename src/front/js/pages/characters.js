import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    const [favs, setFavs] = useState(Array(store.characters.length).fill('regular'));

    useEffect(() => {
        const favStatus = store.characters.map(character =>
            store.favorites.some(fav => fav.id === character.uid && fav.type === 'character') ? 'solid' : 'regular'
        );
        setFavs(favStatus);
    }, [store.characters, store.favorites]);

    const getCurrent = (characterUrl) => {
        actions.getCurrent(characterUrl);
    }

    const handleFavorite = (index, character) => {
        actions.addFavorite(character);
        toggleFav(index);
    }

    const toggleFav = (index) => {
        const newFavs = [...favs];
        newFavs[index] = newFavs[index] === 'regular' ? 'solid' : 'regular';
        setFavs(newFavs);
    }
    
        useEffect(() => {
            actions.loadStoreFromLocal();
        }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                {store.characters.map((character, index) => (
                    <div key={character.uid} className="col-12 col-sm-6 col-md-3 d-flex align-items-stretch">
                        <div className="card m-3" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`} alt={`Character ${index}`} />
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                                <Link to='/details' className="btn btn-outline-dark me-5" onClick={() => getCurrent(character.url)}>Ver Detalles</Link>
                                <div className="float-end">
                                    <button onClick={() => handleFavorite(index, character)}>
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
