import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Characters } from "./pages/characters";
import { Planets } from "./pages/planets";
import { Species } from "./pages/species";
import { Details } from "./pages/details";
import { PlanetDetails } from "./pages/planetDetails";
import { SpecieDetails } from "./pages/specieDetails";
import { Contacts } from "./pages/contacts";
import { AddContacts } from "./pages/addContacts";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { Profile } from "./pages/profile";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<Details index={0} />} path="/details" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<PlanetDetails />} path="/planetsDetails" />
                        <Route element={<Species />} path="/species" />
                        <Route element={<SpecieDetails />} path="/specieDetails" />
                        <Route element={<Contacts />} path="/contacts" />
                        <Route element={<AddContacts />} path="/addContacts" />
                        <Route element={<Login />} path='/login' />
                        <Route element={<Signup />} path='/signup' />
                        <Route element={<Dashboard />} path='/dashboard' />
                        <Route element={<Profile />} path='/profile' />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
