import React from 'react';

function TableServInfo({ data }) {
    return (
        <div>
            <table className='table001'>
                <thead>
                    <tr className='tr001'>
                        <th className='th001'>Codigo Servicio</th>
                        <th className='th001'>Descripcion Servicio</th>
                        <th className='th001'>N° Servicios Realizados</th>
                        <th className='th001'>Valor Total de los Servicios</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className='tr001'>
                            <td className='td001'>{item.codigo}</td>
                            <td className='td001'>{item.descripcion}</td>
                            <td className='td001'>{item.cantidad}</td>
                            <td className='td001'>{item.valorTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableServInfo;
