import React, { useState } from 'react';
import axios from 'axios';
import TableAutParInfo from './TableAutParInfo';
import PieCharts from './PieCharts';

function InfoAutoPartes() {
    const [isOn, setIsOn] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(''); // Mes no seleccionado inicialmente
    const [selectedPart, setSelectedPart] = useState('');
    const [data, setData] = useState([]); // Estado para almacenar los datos del backend

    const toggleSwitch = () => {
        setIsOn(prevState => !prevState);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handlePartChange = (event) => {
        setSelectedPart(event.target.value);
    };

    const handleSearch = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get("http://localhost:8080/serviteca/consultarInformeAutoparte", {
                params: {
                    anio: selectedYear,
                    mes: selectedMonth !== '' ? selectedMonth : null, // Solo envía el mes si está seleccionado
                    codigo: selectedPart || null
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data); // Almacenar los datos recibidos en el estado
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    // Genera una lista de años desde 2000 hasta el año actual
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);

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
                    <li className="icons002"><i className="fa-solid fa-print"></i></li>
                </ul>
            </div>
            <div className='content-p'>
                <div className='content'>
                    <div className="filters">
                        <div className="filter">
                            <label htmlFor="year">Año: *</label>
                            <select id="year" value={selectedYear} onChange={handleYearChange}>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter">
                            <label htmlFor="month">Mes:</label>
                            <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                                <option value="">Seleccionar mes</option>
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
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
                            <div className="filter">
                                <label htmlFor="todos-indi">Todos:</label>
                                <div id="todos-indi" className={`switch-state ${isOn ? 'on' : 'off'}`} onClick={toggleSwitch}>
                                    <div className="slider"></div>
                                </div>
                            </div>
                        </div>
                        <div className="filter pos-btn013">
                            <button className='btn013' onClick={handleSearch}>
                                <ul className="icons003">
                                    <li className="icons004"><i className="fa-solid fa-magnifying-glass"></i></li>
                                    <li style={{ margin: "0px 5px" }}>Buscar</li>
                                </ul>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <TableAutParInfo data={data} />
            </div>
            <div className='text010'>
                <h3>Gráfica</h3>
                <PieCharts labels={data.map(item => item.descripcion)} data={data.map(item => item.saldo)} />
            </div>
        </div>
    );
}

export default InfoAutoPartes;
