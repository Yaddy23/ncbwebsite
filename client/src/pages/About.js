import React from 'react'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout title={"About Us"}>
        <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="ncblogo.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
        <h1 className="text-justify mt-1">25 Years in the business</h1>
          <p className="text-justify mt-2">
          New Century Books is a Publisher, importer and distributor of books, 
          online databases, e-Books, Digital Libraries, Online Courseware, 
          Wellness Products, and provides Printing Services.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About