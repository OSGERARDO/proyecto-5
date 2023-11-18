import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
    return (
        <Layout>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/image3.png"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <p className="text-justify mt-2">
                        Bienvenido a Venta de garage, tu destino en línea para descubrir tesoros únicos y experiencias de compra inigualables. Nos enorgullece ofrecer una selección cuidadosamente curada de artículos de segunda mano, cada uno con su propia historia y encanto.

                        En venta de garage, no solo vendemos objetos, sino que ofrecemos una experiencia de compra que va más allá de lo convencional. Nos dedicamos a rescatar y dar nueva vida a objetos preamados, transformando cada artículo en una joya especial que puede encontrar un nuevo hogar y contar nuevas historias.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default About;