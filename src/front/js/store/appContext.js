import React, { createContext, useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: { ...state.store, ...updatedStore },
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            state.actions.loadStoreFromLocal();
            const token = localStorage.getItem('token');
            if (token) {
                state.actions.setIsLogin(true);
            }
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
