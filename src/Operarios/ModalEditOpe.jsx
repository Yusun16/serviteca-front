import React from 'react'
import Label from '../autopartes/Label'
import Input from '../autopartes/Input'

function ModalEditOpe() {
    return (
        <div>
            <div id="demo-modal11" className="modal001">
                <div className="modal__content">
                    <h1>Editar Operario</h1>
                    <div>
                        <form>
                            <div className="container005">
                                <div className='column001'>
                                    <div className='div-col001'>
                                        <Label
                                            className='label005'
                                            htmlFor="cedula"
                                            name="Cedula:"
                                        />
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="cedula"
                                            name="input1"
                                            placeholder="Referencia"
                                            onChange={(e) => console.log(e.target.value)}
                                        // value={inputs.input1}
                                        // onChange={handleInputChange}
                                        // disabled={!isInputEnabled.input1}
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label className='label005' htmlFor="nombre" name="Nombre: *"></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="nombre"
                                            name="input2"
                                        // value={inputs.input2}
                                        // onChange={handleInputChange}
                                        // disabled={!isInputEnabled.input2}
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label className='label005' htmlFor="apellido" name="Apellido: *"></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="apellido"
                                            name="input2"
                                        // value={inputs.input2}
                                        // onChange={handleInputChange}
                                        // disabled={!isInputEnabled.input2}
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label className='label005' htmlFor="correo" name="Correo: *"></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="correo"
                                            name="input2"
                                        // value={inputs.input2}
                                        // onChange={handleInputChange}
                                        // disabled={!isInputEnabled.input2}
                                        />
                                    </div>
                                </div>
                                <div className='column001'>
                                    <div className='div-col001'>
                                        <Label className='label005' htmlFor="direccion" name="Direccion: *"></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="direccion"
                                            name="input2"
                                        // value={inputs.input2}
                                        // onChange={handleInputChange}
                                        // disabled={!isInputEnabled.input2}
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label htmlFor="telefono" name="Telefono: *"></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="telefono"
                                            name="input4"
                                        // value={inputs.input4}
                                        // onChange={handleInputChange}
                                        // disabled={!isInputEnabled.input4}
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label htmlFor="departamento" name="Departamento: *" ></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="departamento"
                                            name="input5"
                                        // value={inputs.input5}
                                        // onChange={handleInputChange}
                                        // disabled={!isInputEnabled.input5}
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label htmlFor="ciudad" name="Ciudad: *" ></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="ciudad"
                                            name="input5"
                                        // value={inputs.input5}
                                        // onChange={handleInputChange}
                                        // disabled={!isInputEnabled.input5}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='containerbtn'>
                                {/* <a href="#demo-modal4" className='btn009' type="submit">
                                    <ul className="icons005">
                                        <li className="icons004"><i className="fa-solid fa-floppy-disk"></i></li>
                                        <li className="">Guardar</li>
                                    </ul>
                                </a> */}
                                <a href="#demo-modal12" className='btn009' type="submit">
                                    <ul className="icons005">
                                        <li className="icons004"><i className="fa-solid fa-floppy-disk"></i></li>
                                        <li className="">Guardar</li>
                                    </ul>
                                </a>

                                <button className='btn007' type="reset">
                                    <ul className="icons005">
                                        <li className="icons004"><i className="fa-regular fa-circle-xmark"></i></li>
                                        <li className="">Cancelar</li>
                                    </ul>
                                </button>

                            </div>
                        </form>
                    </div>
                    <a href="#" className="modal__close">&times;</a>
                </div>
            </div>
        </div>
    )
}

export default ModalEditOpe