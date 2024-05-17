import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const numElements = store.favorites.length;

    const handleDeleteFavorite = (id) => {
        actions.deleteFavorite(id);
    };
    
        useEffect(() => {
            actions.loadStoreFromLocal(); //No he conseguido esto.
        }, []);

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container d-flex justify-content-between align-items-center">
                    <Link to='/'>
                        <img className="logo" src="https://pngimg.com/d/star_wars_logo_PNG11.png" alt="Star Wars Logo" />
                    </Link>
                    <div className="d-flex align-items-center">
                        <Link to='/characters'>
                            <button type="button" className="btn btn-outline-dark btn-lg">Characters</button>
                        </Link>
                        <Link to='/planets'>
                            <button type="button" className="btn btn-outline-dark btn-lg ms-3">Planets</button>
                        </Link>
                        <Link to='/species'>
                            <button type="button" className="btn btn-outline-dark btn-lg ms-3">Species</button>
                        </Link><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>                       
                        <div className="dropdown ms-3">
                            <button className="btn btn-outline-warning dropdown-toggle btn-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{numElements}</span>
                                Favorites
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {store.favorites.length > 0 ? (
                                    store.favorites.map((favorite, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center">
                                            <Link className="dropdown-item" to="#">{favorite.element + ' - ' + favorite.type}</Link>
                                            <button className="btn btn-outline-danger btn-sm me-1" onClick={() => handleDeleteFavorite(favorite.id)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>                                     
                                        </div>
                                    ))
                                ) : (
                                    <span className="dropdown-item">Add some favorites</span>
                                )}
                            </div>
                        </div>
                        <Link to='/contacts'>
                            <button type="button" className="btn btn-outline-dark btn-lg ms-3">Contacts</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};
