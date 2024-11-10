import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import LogOut from '../logins/LogOut';

export default function ListadoCliente() {

  const urlBase = "http://localhost:8080/serviteca/cliente";
  const [clientes, setClientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    const token = localStorage.getItem('token');

    try {
      const resultado = await axios.get(urlBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClientes(resultado.data);
    } catch (error) {
      console.error("Error cargando los clientes:", error);
      alert("Error cargando los clientes. Verifica la conexión con el servidor.");
    }
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`${urlBase}/${id}`);
      cargarClientes();
    } catch (error) {
      console.error("Error eliminando el cliente:", error);
      alert("Error eliminando el cliente, por favor intenta de nuevo.");
    }
  };

  // Calcular el índice del primer y último elemento de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Extraer los elementos de la página actual
  const currentItems = clientes.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(clientes.length / itemsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Cedula", "Nombre", "Ciudad"];
    const tableRows = [];

    clientes.forEach(cliente => {
      const clienteData = [
        cliente.cedula,
        cliente.nombre,
        cliente.ciudad,
      ];
      tableRows.push(clienteData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Listado de Clientes", 14, 15);
    doc.save("listado_clientes.pdf");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(clientes.map(cliente => ({
      "Cedula": cliente.cedula,
      "Nombre": cliente.nombre,
      "Ciudad": cliente.ciudad,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "listado_clientes.xlsx");
  };

  return (
    <div className='container'>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Inicio</li>
          <li className="breadcrumb-item active" aria-current="page">Cliente</li>
        </ol>
      </nav>

      <div className='container' style={{ margin: "30px" }}>
        <h4>Clientes</h4>
        <LogOut />
      </div>
      <div className='container text-center' style={{ margin: "30px", display: "flex", justifyContent: "center", gap: "84px" }} >
        <Link type="button" className="btn btn-center btncolor" to="/agregarcliente" style={{ width: "280px", height: "50px" }}>Agregar Cliente</Link>
        <Link type="button" className="btn btn-center btncolor" to="/buscarCliente" style={{ width: "280px", height: "50px" }}>Buscar Cliente</Link>
      </div>

      <div className="nav justify-content-end">
        <button className="fa-sharp fa-solid fa-file-pdf p-2 g-col-6"
          style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
          onClick={exportToPDF}>
        </button>
        <button className="fa-sharp fa-solid fa-file-excel p-2 g-col-6"
          style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
          onClick={exportToExcel}>
        </button>
      </div>

      <div className='container'>
        <table className="container">
          <thead>
            <tr>
              <th className='text-letras colorthead' scope="col">Cedula</th>
              <th className='text-letras colorthead' scope="col">Nombre</th>
              <th className='text-letras colorthead' scope="col">Ciudad</th>
              <th className='text-letras colorthead'>Editar</th>
              <th className='text-letras colorthead'>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((cliente, indice) => (
              <tr className='tr-table-tr' key={indice}>
                <td>{cliente.cedula}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.ciudad}</td>
                <td className='text-center'>
                  <Link to={`/EditarCliente/${cliente.idCliente}`} className='btn btn-sm me-3'>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
                <td>
                  <button onClick={() => eliminarCliente(cliente.idCliente)} className='btn btn-sm'>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="h4 pb-2 mb-4 border-bottom border-black"></div>
        <div className='d-flex justify-content-between align-items-center'>
          <h6><span>Mostrando {currentPage} de {totalPages}</span></h6>
          <div className="d-flex justify-content-start justify-content-end">
            <button
              className="btn btn-secondary me-2"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <button type="button" className="btn btn-light">
              <span>{currentPage}</span>
            </button>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
