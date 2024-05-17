import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contacts = () => {
    const [inputValue, setInputValue] = useState('');
    const [agenda, setAgenda] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const { store, actions } = useContext(Context);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/spain`);
        if (response.ok) {
            const data = await response.json();
            setAgenda(data.contacts.map(contact => ({
                id: contact.id,
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                address: contact.address
            })));
        } else {
            console.error('Error al traer datos:', response.statusText);
        }
    };

    const handleEraseContact = async (id) => {
        await actions.eraseContact(id);
        fetchData();
    };

    const handleEdit = (id, name, address, email, phone) => {
        setEditMode(true);
        setEditId(id);
        setEditName(name);
        setEditAddress(address);
        setEditEmail(email);
        setEditPhone(phone);
    };

    const saveEditContact = async (id) => {
        await actions.editContact(id, editName, editAddress, editEmail, editPhone);
        setEditMode(false);
        setEditId(null);
        setEditName('');
        setEditAddress('');
        setEditEmail('');
        setEditPhone('');
        fetchData();
    };

    return (
        <div className="col d-flex justify-content-center list bg-light">
            <form>
                <div className="row shadow p-3 rounded">
                    <Link to='/addContacts'>
                        <button type="button" className="btn btn-outline-dark btn-lg ms-3">Añadir nuevo contacto</button>
                    </Link>
                </div>
                {agenda.map(contact => (
                    <div key={contact.id} className="row shadow contacts">
                        {editMode && editId === contact.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    value={editAddress}
                                    onChange={e => setEditAddress(e.target.value)}
                                    placeholder="Address"
                                />
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={e => setEditEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <input
                                    type="tel"
                                    value={editPhone}
                                    onChange={e => setEditPhone(e.target.value)}
                                    placeholder="Phone"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary m-1 btn-sm"
                                    onClick={() => saveEditContact(contact.id)}
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-warning m-1 btn-sm"
                                    onClick={() => {
                                        setEditMode(false);
                                        setEditId(null);
                                        setEditName('');
                                        setEditAddress('');
                                        setEditEmail('');
                                        setEditPhone('');
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="item">
                                    Name: {contact.name}
                                    <button className="btn btn-outline-danger btn-sm me-1 mt-1 float-end" onClick={() => <div class="modal" tabindex="-1" role="dialog">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Modal title</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Modal body text goes here.</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-success" onClick={handleEraseContact(contact.id)}>Continue</button>
                                                    <button type="button" class="btn btn-alert" data-dismiss="modal">Cancel</button>                                          
                                                </div>
                                            </div>
                                        </div>
                                    </div>}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <span onClick={() => handleEdit(contact.id, contact.name, contact.address, contact.email, contact.phone)} className="float-end p-0 mt-2 me-2 edit">
                                        <i className="far fa-edit"></i>
                                    </span>
                                </p>
                                <p className="item">
                                    Phone: {contact.phone}
                                </p>
                                <p className="item">
                                    Email: {contact.email}
                                </p>
                                <p className="item">
                                    Address: {contact.address}
                                </p>
                            </>
                        )}
                    </div>
                ))}
                <div className="row shadow-sm foot">
                    <p className="m-1">{agenda.length} {agenda.length === 1 ? 'contacto' : 'contactos'} en la agenda</p>
                </div>
            </form>
        </div>
    );
};
