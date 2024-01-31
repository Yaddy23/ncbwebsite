import React from "react";
import Layout from "../components/Layout";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import { ImLocation2 } from "react-icons/im";
import ncb from "../images/ncb.jpg";
const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={ncb} alt="contactus" style={{ width: "100%" }} />
        </div>

        <div className="col-md-4">
          <h1 className="bg-danger p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any queries and information about the product feel free to contact
            us
          </p>

          <p className="mt-3">
            <ImLocation2 /> : 36 Azalea St. Sto. Niño de Maligaya Park, Brgy
            177, Caloocan City, Philippines
          </p>
          <p className="mt-3">
            <BiMailSend /> : ncbmain.adm@gmail.com | newcenturybks.jnc@gmail.com{" "}
            <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
            newcenturybks.jkbriones@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : (02) 7000.5969 | 8359.5613 | (Globe) 0917.847.7740
            | 0917.675.4102
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
