import React, { useState } from 'react'
import TableAutParInfo from './TableAutParInfo'
import PieCharts from './PieCharts';

function InfoAutoPartes() {
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(prevState => !prevState);
    };

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
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Informe de auto-partes</li>
                </ol>
            </nav>
            <div className='column005'>
                <h6 className='text009'>Informe de auto-partes</h6>
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
                                {/* Add more years here */}
                            </select>
                        </div>
                        <div className="filter">
                            <label htmlFor="month">Mes:</label>
                            <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                                <option value="Enero">Enero</option>
                                {/* Add more months here */}
                            </select>
                        </div>
                        <div className="filter">
                            <label htmlFor="part">Autoparte:</label>
                            <input
                                type="text"
                                id="part"
                                placeholder="Buscar autoparte"
                                value={selectedPart}
                                onChange={handlePartChange}
                            />
                        </div>
                        <div>
                            <div className="filter ">
                                <label htmlFor="todos-indi">Todos:</label>
                                <div id="todos-indi" className={`switch-state ${isOn ? 'on' : 'off'}`} onClick={toggleSwitch}>
                                    <div className="slider"></div>
                                </div>
                            </div>
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
                <TableAutParInfo />

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

export default InfoAutoPartes