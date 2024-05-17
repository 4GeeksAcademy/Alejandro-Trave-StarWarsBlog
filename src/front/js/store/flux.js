import { useState } from "react";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            characters: [],
            currentCharacter: [],
            currentUid: [],
            currentPlanet: [],
            currentSpecie: [],
            planetUid: [],
            specieUid: [],
            favorites: [],
            planets: [],
            species: [],	
            contact: []	
        },
        actions: {

            getCharacters: async () => {
                const response = await fetch("https://www.swapi.tech/api/people");
                const data = await response.json();
                setStore({ characters: data.results });
                return data;
            },

            getPlanets: async () => {
                const response = await fetch("https://www.swapi.tech/api/planets");
                const planetData = await response.json();
                setStore({ planets: planetData.results });
                return planetData;
            },

            getSpecies: async () => {
                const response = await fetch("https://www.swapi.tech/api/species");
                const specieData = await response.json();
                setStore({ species: specieData.results });
                return specieData;
            },

            getCurrent: async (index) => {
                setStore({ currentCharacter: null });
                const details = await fetch(index);
                const data = await details.json();
                setStore({ currentCharacter: data.result.properties });
                setStore({ currentUid: data.result.uid });
                return details;
            },
    
            getCurrentPlanet: async (index) => {
                setStore({ currentPlanet: null });
                const details = await fetch(index);
                const data = await details.json();
                setStore({ currentPlanet: data.result.properties });
                setStore({ planetUid: data.result.uid });
                return details;
            },
            
            getCurrentSpecie: async (index) => {
                setStore({ currentSpecie: null });
                const details = await fetch(index);
                const data = await details.json();
                setStore({ currentSpecie: data.result.properties });
                setStore({ specieUid: data.result.uid });
                console.log(data.result.properties);
                console.log(data.result.uid);
                return details;
            },

            addFavorite: (element) => {
                const store = getStore();
                const favorites = store.favorites;
                const index = favorites.findIndex(fav => fav.id === element.uid && fav.type === 'character');
                
                if (index !== -1) {
                    setStore({ favorites: favorites.filter(fav => fav.id !== element.uid || fav.type !== 'character') });
                    alert("Personaje eliminado de favoritos");
                } else {
                    setStore({ favorites: [...favorites, { id: element.uid, element: element.name, type: 'character' }] });
                    alert("Personaje añadido a favoritos");
                }
            },

            addFavoritePlanet: (element) => {
                const store = getStore();
                const favorites = store.favorites;
                const index = favorites.findIndex(fav => fav.id === element.uid && fav.type === 'planet');
                
                if (index !== -1) {
                    setStore({ favorites: favorites.filter(fav => fav.id !== element.uid || fav.type !== 'planet') });
                    alert("Planeta eliminado de favoritos");
                } else {
                    setStore({ favorites: [...favorites, { id: element.uid, element: element.name, type: 'planet' }] });
                    alert("Planeta añadido a favoritos");
                }
            },
            addFavoriteSpecie: (element) => { 
                const store = getStore();
                const favorites = store.favorites;
                const index = favorites.findIndex(fav => fav.id === element.uid && fav.type === 'specie');
                
                if (index !== -1) {
                    setStore({ favorites: favorites.filter(fav => fav.id !== element.uid || fav.type !== 'specie') });
                    alert("Especie eliminada de favoritos");
                } else {
                    setStore({ favorites: [...favorites, { id: element.uid, element: element.name, type: 'specie' }] });
                    alert("Especie añadida a favoritos");
                }
            },

            deleteFavorite: (id) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter(fav => fav.id !== id);
                setStore({ favorites: updatedFavorites })},

            addContact: async (name, address, email, phone) => {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/spain/contacts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        address,
                        email,
                        phone
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    alert("Contact added");
                    fetchData();
                } else {
                    console.error("Failed to add contact");
                }
            },
            eraseContact: async (id) => {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/spain/contacts/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    const store = getStore();
                    setStore({ contact: store.contact.filter(contact => contact.id !== id) });
                    alert("Contact erased");
                } else {
                    console.error('Failed to erase contact:', response.statusText);
                }
            },

            editContact: async (id, name, address, email, phone) => {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/spain/contacts/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        address,
                        email,
                        phone
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    const store = getStore();
                    const updatedContacts = store.contact.map(contact => 
                        contact.id === id ? { ...contact, name, address, email, phone } : contact
                    );
                    setStore({ contact: updatedContacts });
                    alert("Contact updated successfully");
                } else {
                    console.error("Failed to update contact");
                }
            },

            saveStoreLocally: () => {
                const store = getStore();
                localStorage.setItem("store", JSON.stringify(store));
            },

            loadStoreFromLocal: () => {
                const storedStore = localStorage.getItem("store");
                if (storedStore) {
                    setStore(JSON.parse(storedStore));
                }
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.text();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
