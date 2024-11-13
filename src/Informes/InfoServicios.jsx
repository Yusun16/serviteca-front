import React, { useState, useRef } from 'react'
import PieCharts from './PieCharts';
import TableServInfo from './TableServInfo';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function InfoServicios() {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedPart, setSelectedPart] = useState('');
    const [serviceData, setServiceData] = useState([]);
    const [data, setData] = useState([]);
    const chartRef = useRef(null);

    const handleYearChange = (event) => setSelectedYear(event.target.value);
    const handleMonthChange = (event) => setSelectedMonth(event.target.value);
    const handlePartChange = (event) => setSelectedPart(event.target.value);

    const fetchServiceReport = async () => {
        const url = new URL('http://localhost:8080/serviteca/consultarInformeServicio');
        const token = localStorage.getItem('token');
        if (selectedYear) url.searchParams.append('anio', selectedYear);
        if (selectedMonth) url.searchParams.append('mes', selectedMonth);
        if (selectedPart) url.searchParams.append('codigo', selectedPart);

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setServiceData(data);
        } catch (error) {
            console.error("Error fetching service report:", error);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const headers = [["Codigo Servicio", "Descripcion Servicio", "N° Servicios Realizados", "Valor Total de los Servicios"]];
        const rows = serviceData.map(item => [
            item.codigo,
            item.descripcion,
            item.cantidad,
            item.valorTotal
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

        doc.text("Informe de los servicios", 14, 15);
        doc.save('informe_servicios.pdf');
    };

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();

        const combinedData = serviceData.map(item => ({
            "Codigo Servicio": item.codigo,
            "Descripcion Servicio": item.descripcion,
            "N° Servicios Realizados": item.cantidad,
            "Valor Total de los Servicios": item.valorTotal,
        }));

        const sheet = XLSX.utils.json_to_sheet(combinedData);
        XLSX.utils.book_append_sheet(workbook, sheet, "Informe Completo");

        // Guardar el archivo como Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(excelBlob, 'informes_servicios.xlsx');
    };

    const handlePrint = () => {
        window.print();
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
                    <li className="icons002"><i onClick={downloadPDF} className="fa-solid fa-file-pdf"></i></li>
                    <li className="icons002"><i onClick={exportToExcel} className="fa-solid fa-file-excel"></i></li>
                    <li className="icons002"><i onClick={handlePrint} className="fa-solid fa-print"></i></li>
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
            <div className="printable-content">
                <div>
                    <TableServInfo data={serviceData} />
                </div>
                <div className='text010'>
                    <h3>Gráfica</h3>
                    <div>
                        <PieCharts ref={chartRef} labels={chartLabels} data={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoServicios;
