import React, { useState, useEffect, useRef } from 'react';
import TableLiqOpe from './TableLiqOpe';
import PieCharts from './PieCharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function InfoLiquidacionOperarios() {
    const currentYear = new Date().getFullYear();
    const [isOn, setIsOn] = useState(false);
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedPart, setSelectedPart] = useState('');
    const [data, setData] = useState([]);
    const chartRef = useRef(null);

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

    useEffect(() => {
        fetchData();
    }, []);

    const downloadPDF = () => {
        const doc = new jsPDF();
        const headers = [["Cédula", "Nombre", "N° Servicios Realizados", "Comisión Por Servicios", "Total Comisión"]];
        const rows = data.map(item => [
            item.cedula,
            item.nombreCompleto,
            item.totalServiciosRealizados,
            item.maxComisionServicio ? `$${item.maxComisionServicio.valorCalculado.toFixed(2)}` : '0.00',
            `$${item.totalComision.toFixed(2)}`
        ]);

        doc.autoTable({
            head: headers,
            body: rows,
            startY: 20,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [22, 160, 133] },
        });

        // Agregar imagen de la gráfica al PDF
        if (chartRef.current) {
            const canvas = chartRef.current.getCanvas();
            const chartImage = canvas.toDataURL('image/png', 1.0);
            const imgWidth = 150;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const positionY = doc.lastAutoTable.finalY + 10;

            doc.addImage(chartImage, 'PNG', 10, positionY, imgWidth, imgHeight);
        }

        doc.text("Informe de la liquidación de los operarios", 14, 15);
        doc.save('liquidacion_operarios.pdf');
    };

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();

        const combinedData = data.map(item => ({
            Cédula: item.cedula,
            Nombre: item.nombreCompleto,
            "N° Servicios Realizados": item.totalServiciosRealizados,
            "Comisión Por Servicios": item.maxComisionServicio ? `$${item.maxComisionServicio.valorCalculado.toFixed(2)}` : '0.00',
            "Total Comisión": `$${item.totalComision.toFixed(2)}`,
            "Gráfica de la liquidación": item.nombreCompleto,
            "Total Comisión Gráfica": item.totalComision
        }));

        const sheet = XLSX.utils.json_to_sheet(combinedData);
        XLSX.utils.book_append_sheet(workbook, sheet, "Informe Completo");

        // Guardar el archivo como Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(excelBlob, 'liquidacion_operarios.xlsx');
    };

    const handlePrint = () => {
        window.print();
    };

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
                    <li className="icons002"><i onClick={downloadPDF} className="fa-solid fa-file-pdf"></i></li>
                    <li className="icons002"><i onClick={exportToExcel} className="fa-solid fa-file-excel"></i></li>
                    <li className="icons002"><i onClick={handlePrint} className="fa-solid fa-print"></i></li>
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
            <div className="printable-content">
                <TableLiqOpe data={data} />
                <div className='container-grafica'>
                    <h3 className='text010'>
                        Grafica
                    </h3>
                    <PieCharts ref={chartRef} labels={labels} data={chartData} />
                </div>
            </div>
        </div>
    );
}

export default InfoLiquidacionOperarios;
