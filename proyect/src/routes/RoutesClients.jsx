// routes/AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Clients from "../components/clientes/home.jsx";
import CreateClients from "../components/clientes/create.jsx";
import UpdateClients from "../components/clientes/update.jsx";
import Servicios from "../components/servicios/home.jsx";
import ServiceCreate from "../components/servicios/create.jsx"
import ServiceUpdate from "../components/servicios/update.jsx"
import ClientServices from "../components/clientes/clientServices.jsx"
import ClientReview from "../components/clientes/review.jsx"


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Clients />} />
        <Route path="/clients/create" element={<CreateClients />} />
        <Route path="/clients/update/:id" element={<UpdateClients />} />
        <Route path="/clients/contract/:clienteId" element={<ClientServices />}/>
        <Route path="/clients/review/:clienteId" element={<ClientReview />}/>
        
        <Route path="/services" element={<Servicios />} />
        <Route path="/services/create" element={<ServiceCreate />} />
        <Route path="/services/update/:id" element={<ServiceUpdate />} />
        {/* Agrega más rutas según tus necesidades */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
