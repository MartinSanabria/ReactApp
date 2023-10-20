import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Clientes = (props) => {
  const { clientes, updateClientes, redirectToUpdate,redirectToServices, redirectToCheck } = props;

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
        fetch(`http://127.0.0.1:8000/api/clients/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al eliminar el cliente");
            }
            return response.json();
          })
          .then((data) => {
            updateClientes();
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
              <th>Apellido</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => redirectToUpdate(cliente.id)}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-primary me-2"
                   onClick={() => redirectToCheck(cliente.id)}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-info me-2"
                    onClick={() => redirectToServices(cliente.id)}
                  >
                    <i className="fa-solid fa-id-badge"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(cliente.id)}
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

export default Clientes;
