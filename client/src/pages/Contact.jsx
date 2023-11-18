import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTÁCTANOS</h1>
          <p className="text-justify mt-2">
            cualquier consulta e información sobre el producto no dude en
            llamarnos en cualquier momento las 24 horas, los 7 días de la semana
            disponible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ventadegarage.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
