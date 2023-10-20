import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
  const [serviceData, setServiceData] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });

  const navigate = useNavigate();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
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
      navigate('/services');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error.message);

      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al procesar la solicitud',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <h2>Registro de servicios</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mt-3 mb-3">
          <div className="col-md-1">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
          </div>
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={serviceData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          
        </div>
        <div className="row mb-3">
          <div className="col-md-1">
            <label htmlFor="descripcion" className="form-label">
              Descripcion
            </label>
          </div>
          <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                value={serviceData.descripcion}
                onChange={handleInputChange}
                required
              />
          </div>
         
        </div>
        <div className="row mb-3">
          <div className="col-md-1">
            <label htmlFor="precio" className="form-label">
              Precio
            </label>
          </div>
         <div className="col-md-10">
          <input
              type="number"
              className="form-control"
              id="precio"
              name="precio"
              min={0.00}
              step={0.01}
              value={serviceData.precio}
              onChange={handleInputChange}
              required
            />
         </div>
         
        </div>
        <div className="d-flex gap-2 col-2 mx-auto">
          <button type="submit" className="btn btn-success">
            Guardar
          </button>
          <Link to="/services" className="btn btn-secondary">
            Regresar
          </Link>
        </div>
      </form>
    </>
  );
}

export default Create;
