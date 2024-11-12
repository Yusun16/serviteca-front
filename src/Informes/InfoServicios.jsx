<<<<<<< HEAD
import React, { useState } from 'react'
import PieCharts from './PieCharts';
=======
import React, { useState } from 'react';
>>>>>>> 8c370155bc306cd35a732fc3d62a7a42feb13b54
import TableServInfo from './TableServInfo';
import PieCharts from './PieCharts';

function InfoServicios() {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedPart, setSelectedPart] = useState('');
    const [serviceData, setServiceData] = useState([]); // Estado para almacenar los datos de la consulta

    const handleYearChange = (event) => setSelectedYear(event.target.value);
    const handleMonthChange = (event) => setSelectedMonth(event.target.value);
    const handlePartChange = (event) => setSelectedPart(event.target.value);

    const fetchServiceReport = async () => {
        const url = new URL('http://localhost:8080/serviteca/consultarInformeServicio');
        if (selectedYear) url.searchParams.append('anio', selectedYear);
        if (selectedMonth) url.searchParams.append('mes', selectedMonth);
        if (selectedPart) url.searchParams.append('codigo', selectedPart);

        try {
            const response = await fetch(url);
            const data = await response.json();
            setServiceData(data);
        } catch (error) {
            console.error("Error fetching service report:", error);
        }
    };

    // Preparar datos para la gráfica
    const chartLabels = serviceData.map(item => item.descripcion);
    const chartData = serviceData.map(item => item.valorTotal);

    return (
        <div>
            <nav aria-label="breadcrumb" className='breadcrumb002'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item breadcrumb001">
                        <i className="fa-solid fa-house"></i> Inicio
                    </li>
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Informe de servicios</li>
                </ol>
            </nav>
            <div className='column005'>
                <h6 className='text009'>Informe de servicios</h6>
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
                                {[...Array(25).keys()].map(i => (
                                    <option key={i} value={2000 + i}>{2000 + i}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter">
                            <label htmlFor="month">Mes:</label>
                            <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                                <option value="">Seleccione el mes</option>
                                {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                                  .map((month, index) => (
                                    <option key={index} value={index + 1}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter">
                            <label htmlFor="part">Código:</label>
                            <input
                                type="text"
                                id="part"
                                placeholder="Buscar código"
                                value={selectedPart}
                                onChange={handlePartChange}
                            />
                        </div>
                        <div className="filter pos-btn013">
                            <button className='btn013' type="button" onClick={fetchServiceReport}>
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
                <TableServInfo data={serviceData} />
            </div>
            <div className='text010'>
                <h3>Gráfica</h3>
                <div>
                    <PieCharts labels={chartLabels} data={chartData} />
                </div>
            </div>
        </div>
    );
}

export default InfoServicios;
