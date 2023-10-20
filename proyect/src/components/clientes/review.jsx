import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Review = () => {
    const { clienteId } = useParams();
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServicesReview();
    }, [clienteId]);

    const fetchServicesReview = () => {
        let url = `http://127.0.0.1:8000/api/clients/${clienteId}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setServices(data.services);
            })
            .catch((error) => {
                console.error("Error fetching services:", error.message);
            });
    };

    const handleDetachService = (clientId, serviceId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar el servicio',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://127.0.0.1:8000/api/clients/services/detach`, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    client_id: clientId,
                    service_id: serviceId,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                    console.log(data);
                    // Handle success
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500
                      })
                
                      // Redirigir a la ruta raíz
                      navigate('/');
                    })
                    .catch((error) => {
                    console.error("Error al cancelar el servicio:", error.message);
                    // Handle error
                    });
                }
            });
    };

    return (
        <>
        {services.length === 0 ? (
            <>
            <h2>No hay servicios contratados</h2>
            <div className="d-flex justify-content-end">
                    <Link to="/" className="btn btn-secondary">
                        Regresar
                    </Link>
                </div>
            </>
        ) : (
            <>
                <h1>Servicios contratados</h1>
                <div className="d-flex justify-content-end">
                    <Link to="/" className="btn btn-secondary">
                        Regresar
                    </Link>
                </div>

                <div className="table-responsive mt-3">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
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
                                            className="btn btn-danger"
                                            onClick={() => handleDetachService(clienteId, service.id)}
                                        >
                                            Cancelar Servicio
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
            
        )}
    </>
    );
};

export default Review;
