import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CardServicio from "./services.jsx";

const Servicios = () => {
  const { clienteId } = useParams();
  const [servicios, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, [clienteId]);


  const fetchServices = () => {
    let url = "http://127.0.0.1:8000/api/services";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  };

  const handleAdquirirClick = async (servicioId, ) => {
    try {
      // Aquí deberías realizar la petición POST para adquirir el servicio
      // Usando clienteId y servicioId en la solicitud
      const response = await fetch('http://127.0.0.1:8000/api/clients/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: clienteId,
          service_id: servicioId
        })
      });

      if (!response.ok) {
        throw new Error(response.json.message);
      }

      const data = await response.json();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      })

      // Redirigir a la ruta raíz
      navigate('/');

    } catch (error) {
      console.error('Error al adquirir el servicio:', error.message);
      // Manejo de errores
    }
  };

  return (
    <>
      <h2>Servicios Disponibles</h2>
      <div className="d-flex justify-content-end">
        <Link to="/" className="btn btn-secondary">
          Regresar
        </Link>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="col">
            {/* Corregido: Pasar clienteId al hacer clic */}
            <CardServicio
              servicio={servicio}
              onAdquirir={() => handleAdquirirClick(servicio.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Servicios;
