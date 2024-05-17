import React, { useState, useEffect } from "react"; // Importo React y hooks
import { Link } from "react-router-dom";

export const Contacts = () => {
    const [inputValue, setInputValue] = useState('');
    const [agenda, setAgenda] = useState([]);
    const host = 'https://playground.4geeks.com/contact/docs'; // Meto url en la variable

    useEffect(() => {
        fetchData(); // Traigo las tareas al iniciar
    }, []);

     const fetchData = async () => {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/spain`);
        if (response.ok) {
            const data = await response.json();
            setAgenda(data.contacts.map(agenda => ({ id: agenda.id, name:agenda.name, phone:agenda.phone, email:agenda.email, address:agenda.address}))); //traigo los datos
        } else {
            console.error('Error al traer datos:', response.statusText);
        }
    };

    /* const addTodo = async () => { // Añado datos
        try {
            const response = await fetch(`${host}/todos/Pepito`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    label: inputValue,
                    is_done: false
                })
            });
            if (response.ok) {
                const data = await response.json();
                setTodos([...todos, { id: data.id, label: inputValue }]); // Agrego las nuevas tareas al array
                setInputValue('');
                alert("Tarea añadida a Playground");
            } else {
                console.error('Error al añadir tarea:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const eraseTodo = async (id) => {
        try {
            const response = await fetch(`${host}/todos/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setTodos(todos.filter(todo => todo.id !== id)); // Devuelve listado menos el id a borrar
                alert("Tarea borrada también de Playground");
            } else {
                console.error('Error al borrar tarea:', response.statusText);
            }
        } catch (error) {
            console.error('Error al borrar tarea:', error);
        }
    };

    const eraseAll = async () => {

        for (const todo of todos) { // No encontré otra forma de hacer esto
            const response = await fetch(`${host}/todos/${todo.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                console.error('Error al borrar todo:', response.statusText);
            }
        }
        setTodos([]); //limpio la lista de tareas
        alert("Todas las tareas han sido borradas también de Playground");
    };
 */
    return (
        <div className="col d-flex justify-content-center list bg-light">
            <form>
                <div className="row shadow p-3 rounded">
                <Link to='/editContacts'>
				  <button type="button" className="btn btn-outline-dark btn-lg ms-3">Añadir nuevo contacto</button>
				</Link>
                </div>
                {agenda.map(agenda => (
                    <div key={agenda.id} className="row shadow todos">
                        <p className="item">
                           Name: {agenda.name} 
                            {/* <span onClick={() => eraseTodo(todo.id)} className="float-end p-0 m-0 erase">x</span> */}
                        </p>
                        <p className="item">
                           Phone: {agenda.phone}
                            {/* <span onClick={() => eraseTodo(todo.id)} className="float-end p-0 m-0 erase">x</span> */}
                        </p>
                        <p className="item">
                           email: {agenda.email}
                            {/* <span onClick={() => eraseTodo(todo.id)} className="float-end p-0 m-0 erase">x</span> */}
                        </p>
                        <p className="item">
                            Address: {agenda.address}
                            {/* <span onClick={() => eraseTodo(todo.id)} className="float-end p-0 m-0 erase">x</span> */}
                        </p>
                    </div>
                ))}
                <div className="row shadow-sm foot">
                    <p className="m-1">{agenda.length} {agenda.length === 1 ? 'contacto' : 'contactos'} en la agenda</p>
                </div>
            </form>
            {/* <div>
                <button type="button" onClick={eraseAll} className="btn btn-danger ms-5">Borrar todo</button>
            </div> */}
        </div>
    );
};

