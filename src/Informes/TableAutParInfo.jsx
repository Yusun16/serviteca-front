import React from 'react';
import ImgRoja from '../img/icon-idni-1.png';
import ImgVerde from '../img/icon-idni-2.png';

function TableAutParInfo({ data }) {
    return (
        <div>
            <table className='table001'>
                <thead>
                    <tr className='tr001'>
                        <th className='th001'>Codigo Producto</th>
                        <th className='th001'>Descripcion</th>
                        <th className='th001'>Cantidad Existencias</th>
                        <th className='th001'>Saldo</th>
                        <th className='th001'>Indicador</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className='tr001'>
                            <td className='td001'>{item.codigo}</td>
                            <td className='td001'>{item.descripcion}</td>
                            <td className='td001'>{item.cantidadExistente}</td>
                            <td className='td001'>{item.saldo}</td>
                            <td className='td001'>
                                <div>
                                    <img 
                                        src={item.cantidadExistente > 5 ? ImgVerde : ImgRoja} 
                                        className='indi001' 
                                        alt='img-indicador' 
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableAutParInfo;
