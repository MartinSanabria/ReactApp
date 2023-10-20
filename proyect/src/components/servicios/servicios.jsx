import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Services = (props) => {
  const { services, updateServices, redirectToUpdate } = props;

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:8000/api/services/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al eliminar el cliente");
            }
            return response.json();
          })
          .then((data) => {
            updateServices();
            Swal.fire(
              'Eliminado',
              data.message,
              'success'
            );
          })
          .catch((error) => {
            console.error("Error al eliminar el cliente:", error.message);
          });
      }
    });
  };

  return (
    <>
      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.nombre}</td>
                <td>{service.descripcion}</td>
                <td>{service.precio}</td>
                <td>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => redirectToUpdate(service.id)}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(service.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Services;
