import React, { useState } from 'react'
import PieCharts from './PieCharts';
import TableServInfo from './TableServInfo';

function InfoServicios() {

    const [selectedYear, setSelectedYear] = useState(2000);
    const [selectedMonth, setSelectedMonth] = useState('Enero');
    const [selectedPart, setSelectedPart] = useState('');

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handlePartChange = (event) => {
        setSelectedPart(event.target.value);
    };
    return (
        <div>
            <nav aria-label="breadcrumb" className='breadcrumb002'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item breadcrumb001">
                        <i className="fa-solid fa-house"></i>
                        Inicio
                    </li>
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Informe de servicios</li>
                </ol>
            </nav>
            <div className='column005'>
                <h6 className='text009'>Informe de servicios</h6>
                <ul className="icons001 icons009">
                    <li className="icons002"><i className="fa-solid fa-file-pdf"></i></li>
                    <li className="icons002"><i className="fa-solid fa-file-excel"></i></li>
                    <li className="icons002"><i class="fa-solid fa-print"></i></li>
                </ul>
            </div>
            <div className='content-p'>
                <div className='content'>
                    <div className="filters">
                        <div className="filter">
                            <label htmlFor="year">Año: *</label>
                            <select id="year" value={selectedYear} onChange={handleYearChange}>
                                <option value="2000">2000</option>
                                <option value="2000">2001</option>
                                <option value="2000">2002</option>
                                <option value="2000">2003</option>
                                <option value="2000">2004</option>
                                <option value="2005">...</option>
                            </select>
                        </div>
                        <div className="filter">
                            <label htmlFor="month">Mes:</label>
                            <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                                <option value="Enero">Enero</option>
                                <option value="Enero">Febrero</option>
                                <option value="Enero">Marzo</option>
                                <option value="Enero">Abril</option>
                                <option value="Enero">Mayo</option>
                                <option value="Enero">...</option>
                            </select>
                        </div>
                        <div className="filter">
                            <label htmlFor="part">Codigo:</label>
                            <input
                                type="text"
                                id="part"
                                placeholder="Buscar codigo"
                                value={selectedPart}
                                onChange={handlePartChange}
                            />
                        </div>
                        <div className="filter pos-btn013">
                            <a className='btn013' type="submit">
                                <ul className="icons003">
                                    <li className="icons004"><i className="fa-solid fa-magnifying-glass"></i></li>
                                    <li style={{ margin: "0px 5px" }}>Buscar</li>
                                </ul>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <TableServInfo />

            </div>
            <div className='text010'>
                <h3 >
                    Grafica
                </h3>
                <div>
                    <PieCharts />
                </div>
            </div>
        </div>
    )
}

export default InfoServicios