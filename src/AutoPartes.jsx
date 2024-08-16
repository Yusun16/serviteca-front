import React, { useState } from 'react';
import TableAutoPartes from './TableAutoPartes';
// import './App.css';

function AutoPartes() {
    const [inputs, setInputs] = useState({
        input1: '',
        input2: '',
        input3: '',
        dropdown1: '',
        dropdown2: '',
        input4: '',
        input5: '',
    });

    const [isInputEnabled, setIsInputEnabled] = useState({
        input1: true,
        input2: false,
        input3: false,
        dropdown1: false,
        dropdown2: false,
        input4: false,
        input5: false,
    });

    // Maneja el cambio en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => {
            const newInputs = { ...prevInputs, [name]: value };

            // Habilitar el siguiente input si el actual no está vacío
            setIsInputEnabled((prevState) => {
                const updatedState = { ...prevState };

                if (name === 'input1' && value.trim() !== '') {
                    updatedState.input2 = true;
                }
                if (name === 'input2' && value.trim() !== '') {
                    updatedState.input3 = true;
                }
                if (name === 'input3' && value.trim() !== '') {
                    updatedState.dropdown1 = true;
                }
                if (name === 'dropdown1' && newInputs.dropdown1.trim() !== '') {
                    updatedState.dropdown2 = true;
                }
                if (name === 'dropdown2' && newInputs.dropdown2.trim() !== '') {
                    updatedState.input4 = true;
                }
                if (name === 'input4' && value.trim() !== '') {
                    updatedState.input5 = true;
                }

                return updatedState;
            });

            return newInputs;
        });
    };

    const handleDropdownChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => {
            const newInputs = { ...prevInputs, [name]: value };

            // Re-evaluar la habilitación de los inputs si se cambian los dropdowns
            setIsInputEnabled((prevState) => {
                const updatedState = { ...prevState };

                if (name === 'dropdown1' && newInputs.dropdown1.trim() !== '') {
                    updatedState.dropdown2 = true;
                }
                if (name === 'dropdown2' && newInputs.dropdown2.trim() !== '') {
                    updatedState.input4 = true;
                    // updatedState.input5 = true;
                }

                return updatedState;
            });

            return newInputs;
        });
    };

    return (
        <div className="App">
            <h1>Autopartes</h1>
            <form>
                <div>
                    <label htmlFor="referencia">Referencia:</label>
                    <input
                        type="text"
                        id="referencia"
                        name="input1"
                        value={inputs.input1}
                        onChange={handleInputChange}
                        disabled={!isInputEnabled.input1}
                    />
                </div>
                <div>
                    <label htmlFor="codigoStISO">Código SIISO:</label>
                    <input
                        type="text"
                        id="codigoStISO"
                        name="input2"
                        value={inputs.input2}
                        onChange={handleInputChange}
                        disabled={!isInputEnabled.input2}
                    />
                </div>
                <div>
                    <label htmlFor="descripcion">Descripción:</label>
                    <input
                        type="text"
                        id="descripcion"
                        name="input3"
                        value={inputs.input3}
                        onChange={handleInputChange}
                        disabled={!isInputEnabled.input3}
                    />
                </div>
                <div>
                    <label htmlFor="linea">Linea:</label>
                    <div className="dropdown">
                        <select className="dropdown-toggle"
                            name="dropdown1"
                            value={inputs.dropdown1}
                            onChange={handleDropdownChange}
                            disabled={!isInputEnabled.dropdown1}
                        >
                            <option value="" disabled>Selecciona una opción</option>
                            <option >Opción 1</option>
                            <option >Opción 2</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="tipo">Tipo:</label>
                    <div className="dropdown">
                        <select className="dropdown-toggle"
                            name="dropdown2"
                            value={inputs.dropdown2}
                            onChange={handleDropdownChange}
                            disabled={!isInputEnabled.dropdown2}
                        >
                            <option value="" disabled>Selecciona una opción</option>
                            <option>Opción 1</option>
                            <option>Opción 2</option>
                            <option>Opción 3</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="marca">Marca:</label>
                    <input
                        type="text"
                        id="marca"
                        name="input4"
                        value={inputs.input4}
                        onChange={handleInputChange}
                        disabled={!isInputEnabled.input4}
                    />
                </div>
                <div>
                    <label htmlFor="modelo">Modelo:</label>
                    <input
                        type="text"
                        id="modelo"
                        name="input5"
                        value={inputs.input5}
                        onChange={handleInputChange}
                        disabled={!isInputEnabled.input5}
                    />
                </div>

                <button type="submit">Guardar</button>
            </form>
            <TableAutoPartes />
        </div>
    );
}

export default AutoPartes;