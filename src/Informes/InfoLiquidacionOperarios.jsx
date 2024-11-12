import React, { useState, useEffect } from 'react';
import TableLiqOpe from './TableLiqOpe';
import PieCharts from './PieCharts';

function InfoLiquidacionOperarios() {
    const currentYear = new Date().getFullYear(); // Obtener el año actual
    const [isOn, setIsOn] = useState(false);
    const [selectedYear, setSelectedYear] = useState(currentYear.toString()); // Año actual como valor predeterminado
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedPart, setSelectedPart] = useState('');
    const [data, setData] = useState([]);

    const toggleSwitch = () => setIsOn(prevState => !prevState);

    const handleYearChange = (event) => setSelectedYear(event.target.value);
    const handleMonthChange = (event) => setSelectedMonth(event.target.value);
    const handlePartChange = (event) => setSelectedPart(event.target.value);

    const fetchData = async () => {
        const url = new URL('http://localhost:8080/serviteca/consultarInformeOperario');
        const token = localStorage.getItem('token');
        if (selectedYear) url.searchParams.append('anio', selectedYear);
        if (selectedMonth) url.searchParams.append('mes', selectedMonth);
        if (selectedPart) url.searchParams.append('cedula', selectedPart);

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();

            // Agrupar datos por operario
            const groupedData = result.reduce((acc, curr) => {
                const existingOperario = acc.find(item => item.cedula === curr.cedula);
                const serviceValue = curr.valorServicio * (curr.porcentajeOperario / 100);

                if (existingOperario) {
                    existingOperario.totalServiciosRealizados += parseInt(curr.totalServiciosRealizados, 10);
                    existingOperario.comisionPorServicios.push({
                        valorServicio: curr.valorServicio,
                        porcentaje: curr.porcentajeOperario,
                        valorCalculado: serviceValue,
                    });
                    existingOperario.totalComision += serviceValue;

                    if (!existingOperario.maxComisionServicio || curr.porcentajeOperario > existingOperario.maxComisionServicio.porcentaje) {
                        existingOperario.maxComisionServicio = {
                            valorServicio: curr.valorServicio,
                            porcentaje: curr.porcentajeOperario,
                            valorCalculado: serviceValue,
                        };
                    }
                } else {
                    acc.push({
                        cedula: curr.cedula,
                        nombreCompleto: curr.nombreCompleto,
                        totalServiciosRealizados: parseInt(curr.totalServiciosRealizados, 10),
                        comisionPorServicios: [{
                            valorServicio: curr.valorServicio,
                            porcentaje: curr.porcentajeOperario,
                            valorCalculado: serviceValue,
                        }],
                        totalComision: serviceValue,
                        maxComisionServicio: {
                            valorServicio: curr.valorServicio,
                            porcentaje: curr.porcentajeOperario,
                            valorCalculado: serviceValue,
                        },
                    });
                }
                return acc;
            }, []);

            setData(groupedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Llamar a fetchData cuando el componente se monta
    useEffect(() => {
        fetchData();
    }, []); // Solo se ejecuta una vez al montar el componente

    // Calcular labels y data para el gráfico de pastel
    const labels = data.map(item => item.nombreCompleto);
    const chartData = data.map(item => item.totalComision);

    return (
        <div className='content-grafic'>
            <nav aria-label="breadcrumb" className='breadcrumb002'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item breadcrumb001">
                        <i className="fa-solid fa-house"></i> Inicio
                    </li>
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Informe de liquidación de operarios</li>
                </ol>
            </nav>
            <div className='column005'>
                <h6 className='text009'>Informe de liquidación de operarios</h6>
                <ul className="icons001 icons009">
                    <li className="icons002"><i className="fa-solid fa-file-pdf"></i></li>
                    <li className="icons002"><i className="fa-solid fa-file-excel"></i></li>
                    <li className="icons002"><i className="fa-solid fa-print"></i></li>
                </ul>
            </div>
            <div className='content002'>
                <div className='content003'>
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
                                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, index) => (
                                        <option key={index} value={index + 1}>{month}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="filter">
                            <label htmlFor="part">Operario C.C:</label>
                            <input
                                type="text"
                                id="part"
                                placeholder="Buscar operario"
                                value={selectedPart}
                                onChange={handlePartChange}
                            />
                        </div>
                        <div className="filter">
                            <label htmlFor="todos-indi">Todos:</label>
                            <div id="todos-indi" className={`switch-state ${isOn ? 'on' : 'off'}`} onClick={toggleSwitch}>
                                <div className="slider"></div>
                            </div>
                        </div>
                        <div className="filter pos-btn013">
                            <button className='btn013' onClick={fetchData}>
                                <ul className="icons003">
                                    <li className="icons004"><i className="fa-solid fa-magnifying-glass"></i></li>
                                    <li style={{ margin: "0px 5px" }}>Buscar</li>
                                </ul>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <TableLiqOpe data={data} />
            <div className='container-grafica'>
                <h3 className='text010'>
                    Grafica
                </h3>
                <PieCharts labels={labels} data={chartData} />
            </div>
        </div>
    );
}

export default InfoLiquidacionOperarios;
