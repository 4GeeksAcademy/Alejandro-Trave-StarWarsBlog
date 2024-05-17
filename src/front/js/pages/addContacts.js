import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const AddContacts = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.addContact(name, address, email, phone);
        navigate("/contacts");
    };

    const handleCancel = () => {
        navigate("/contacts");
    };

    return (
        <div className="p-5">
        <form>
            <div className="form-group m-2">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                    <small id="emailHelp" className="form-text text-muted">El lado oscuro no te enviará spam</small>
            </div>
            <div className="form-group m-2">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div className="form-group m-2">
                <label htmlFor="phone">Phone</label>
                <input type="text" className="form-control" id="phone" placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary ms-2" onClick={handleSubmit}>Enviar</button>
            <button type="reset" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancelar</button>
        </form>
        </div>
    );
}
