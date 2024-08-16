import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

// let table = new DataTable('#myTable');


const columns = (handleEdit, handleDelete) => [
    { name: "Codigo", selector: row => row.Codigo },
    { name: "Descripcion", selector: row => row.Descripcion },
    { name: "Tipo", selector: row => row.Tipo },
    { name: "Editar", cell: row => <a href="#demo-modal" className="btn-modal" onClick={() => handleEdit(row)} >Editar</a> },
    { name: "Eliminar", cell: row => <button onClick={() => handleDelete(row)}>Eliminar</button> },
]

const data = [
    {
        Codigo: "456546",
        Descripcion: "gas",
        Tipo: "Renault",
    },
    {
        Codigo: "456546",
        Descripcion: "gas",
        Tipo: "Renault",
    }
]
function TableAutoPartes() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleEdit = (row) => {
        console.log("Editar", row);
        // Lógica de edición
    }

    const handleDelete = (row) => {
        console.log("Eliminar", row);
        // Lógica de eliminación
    }

    const closeModal = () => {
        setModalIsOpen(false); // Cierra el modal
    }

    const saveChanges = () => {
        console.log("Guardar cambios", selectedRow);
        closeModal();
        // Lógica para guardar los cambios
    }
    return (
        <div>
            <DataTable
                pagination
                columns={columns(handleEdit, handleDelete)}
                data={data}
            />

            <div id="demo-modal" className="modal001">
                <div className="modal__content">
                    <h1>Modificando datos</h1>
                    <p>
                        ¡Cambia o actualiza tus datos!
                    </p>
                    <form action="" method='' className="form009">
                        <div className="form0010">
                            <div className="input005">
                                <input type="text" name="" id="" placeholder='Nombre de la empresa' className='input006' />
                                <span className="span007"></span>
                            </div>
                            <div className="input005">
                                <input type="text" name="" id="" placeholder='Nombre del usuario' className='input006' />
                                <span className="span007"></span>
                            </div>
                            <div className="input005">
                                <input type="number" name="" id="" placeholder='Telefono' className='input006' />
                                <span className="span007"></span>
                            </div>
                            <div className="input005">
                                <input type="email" name="" id="" placeholder='Correo' className='input006' />
                                <span className="span007"></span>
                            </div>
                            <div className="input005">
                                <input type="text" name="" id="" placeholder='Lugar' className='input006' />
                                <span className="span007"></span>
                            </div>
                            <div className="input005">
                                <input type="text" name="" id="" placeholder='Dirección' className='input006' />
                                <span className="span007"></span>
                            </div>
                            <button type="submit" className="view001">Modificar</button>
                        </div>
                    </form>
                    <a href="#" className="modal__close">&times;</a>
                </div>
            </div>
        </div>
    )
}

export default TableAutoPartes