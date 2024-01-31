import React from "react";
import Layout from "../components/Layout";
import ncbabout from "../images/newabout.jpg";
const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={ncbabout} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h1 className="text-justify mt-1">25 Years in the business</h1>
          <p className="text-justify mt-2">
            <b>New Century Books</b> is a Publisher, importer and distributor of
            books, online databases, e-Books, Digital Libraries, Online
            Courseware, Wellness Products, and provides Printing Services.
            <br />
            <br />
            For <b>25 years</b>, the number of customers exponentially increased
            as it continues to participate in different organizations, book
            fairs, and conferences. New Century Books is steadily keeping its
            reputation as{" "}
            <b>
              one of the most dynamic and progressive bookseller in the country
              today
            </b>
            .
            <br />
            <br />
            As many institutions have proceeded to enhance their library
            collections, New Century Books is dedicated to providing them
            quality materials to better improve the country's educational
            system. The company intend to further develop the business and
            accelerate it to reach global standards and align with worldwide
            educational institutions.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
