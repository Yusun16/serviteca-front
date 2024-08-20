function TableAutoPartes() {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Descripcion</th>
                        <th>Tipo</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dato 1</td>
                        <td>Dato 2</td>
                        <td>Dato 3</td>
                        <td><a href="#demo-modal1" className="btn-modal" >Editar</a></td>
                        <td><a href="#demo-modal2" className="btn-modal"> Eliminar</a></td>
                        {/*  */}
                        <div id="demo-modal1" className="modal001">
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
                        <div id="demo-modal2" className="modal001">
                            <div className="modal__content">
                                <h1>Eliminar datos</h1>
                                <p>
                                    ¡Elimina tus datos!
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
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableAutoPartes
