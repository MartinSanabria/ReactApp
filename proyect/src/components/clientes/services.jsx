// CardServicio.jsx
import React from "react";

const CardServicio = ({ servicio, onAdquirir }) => {
  const handleAdquirir = () => {
    // Mostrar SweetAlert de confirmación
    Swal.fire({
      title: '¿Seguro que desea contratar este servicio?',
      text: `Está a punto de adquirir el servicio: ${servicio.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, adquirirlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar a la función onAdquirir si el usuario confirma
        onAdquirir(servicio.id);
      }
    });
  };

  return (
    <div className="card" style={{ width: '18em' }}>
      <div className="card-body">
        <h5 className="card-title">{servicio.nombre}</h5>
        <p className="card-text">{servicio.descripcion}</p>
        <p className="card-text">Precio: ${servicio.precio}</p>
        <button className="btn btn-primary" onClick={handleAdquirir}>
          Adquirir
        </button>
      </div>
    </div>
  );
};

export default CardServicio;
