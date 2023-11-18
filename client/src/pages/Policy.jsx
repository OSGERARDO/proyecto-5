import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/Politicas.png"
            alt="policy"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>Recopilación Limitada de Información</p>
          <p>Seguridad de la Información</p>
          <p>Uso Limitado de Información</p>
          <p>Consentimiento Explícito</p>
          <p>Derecho de Acceso y Modificación</p>
          <p>Almacenamiento Limitado en el Tiempo</p>
          <p>Comunicación Transparente</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
