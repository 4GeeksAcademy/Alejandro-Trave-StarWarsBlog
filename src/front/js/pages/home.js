import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import vader from "../../img/vader.png";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
        <div id="main" className="text-center mt-5">
            <img id="vader" src={vader} alt="Imagen" />
        </div>
    );
};