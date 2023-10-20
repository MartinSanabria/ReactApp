import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Servicios from "./servicios";
import Navbar  from "../layouts/navbar.jsx";

function ServiciesContainer() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    let url = "http://127.0.0.1:8000/api/services";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  };

  const redirectToUpdate = (id) => {
    navigate(`/services/update/${id}`);
  };

  const updateServices = () => {
    fetchServices();
  };

  return (
    <>
    <Navbar/>
      <h2>Listado de Servicios</h2>
      <div className="d-flex justify-content-end">
        <Link to="/services/create" className="btn btn-primary mb-2">
          Crear servicios
        </Link>
      </div>
      <Servicios
        services={services}
        updateServices={updateServices}
        redirectToUpdate={redirectToUpdate}
      />
    </>
  );
}

export default ServiciesContainer;
