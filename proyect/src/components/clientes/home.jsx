import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Clientes from "./Clientes";
import Navbar  from "../layouts/navbar.jsx";

function ClientesContainer() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    let url = "http://127.0.0.1:8000/api/clients";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
      });
  };

  const redirectToUpdate = (id) => {
    navigate(`/clients/update/${id}`);
  };

  const redirectToServices = (id) => {
    navigate(`/clients/contract/${id}`);
  }

  const redirectToCheck = (id) => {
    navigate(`/clients/review/${id}`);
  }

  const updateClientes = () => {
    fetchClientes();
  };

  return (
    <>
    <Navbar/>
      <h2>Listado de clientes</h2>
      <div className="d-flex justify-content-end">
        <Link to="/clients/create" className="btn btn-primary mb-2">
          Crear Cliente
        </Link>
      </div>
      <Clientes
        clientes={clientes}
        updateClientes={updateClientes}
        redirectToUpdate={redirectToUpdate}
        redirectToServices={redirectToServices}
        redirectToCheck={redirectToCheck}
      />
      
    </>
  );
}

export default ClientesContainer;
