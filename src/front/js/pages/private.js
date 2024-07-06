import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Private = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.isLogin) {
            navigate('/login');
        }
    }, [store.isLogin, navigate]);

    return (
        <div>
            <h1>Menú Privado</h1>
        </div>
    );
};
