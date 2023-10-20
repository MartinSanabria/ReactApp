import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clienteData, setClienteData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  useEffect(() => {
    // Obtener los detalles del cliente al cargar el componente
    fetch(`http://127.0.0.1:8000/api/clients/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClienteData(data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles del cliente:', error.message);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClienteData({ ...clienteData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
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
        timer: 1500,
      });

      // Redirigir a la ruta raíz
      navigate('/');
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
      <h2>Actualizar cliente</h2>
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
              value={clienteData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          
        </div>
        <div className="row mb-3">
          <div className="col-md-1">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
          </div>
          <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                value={clienteData.apellido}
                onChange={handleInputChange}
                required
              />
          </div>
         
        </div>
        <div className="row mb-3">
          <div className="col-md-1">
            <label htmlFor="email" className="form-label">
              Email
            </label>
          </div>
          <div className="col-md-10">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={clienteData.email}
                onChange={handleInputChange}
                required
              />
          </div>
          
        </div>
        <div className="row mb-3">
          <div className="col-md-1">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
          </div>
         <div className="col-md-10">
          <input
              type="text"
              className="form-control"
              id="telefono"
              name="telefono"
              value={clienteData.telefono}
              onChange={handleInputChange}
              required
            />
         </div>
         
        </div>
        <div className="row mb-3">
          <div className="col-md-1">
            <label htmlFor="direccion" className="form-label">
              Dirección
            </label>
          </div>
         <div className="col-md-10">
          <input
              className="form-control"
              id="direccion"
              name="direccion"
              value={clienteData.direccion}
              onChange={handleInputChange}
              required
            />
         </div>
         
        </div>
        <div className="d-flex gap-2 col-2 mx-auto">
          <button type="submit" className="btn btn-success">
            Guardar
          </button>
          <Link to="/" className="btn btn-secondary">
            Regresar
          </Link>
        </div>
      </form>
    </>
  );
}

export default Update;
