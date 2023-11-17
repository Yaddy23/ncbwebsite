import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

const AddProduct = () => {
  return (
    <Layout title={"Add Product"}>
        <div className="container-fluid m-3 p-3"> 
        <div className="row">
            <div className="col-md-3">
                <AdminMenu /> 
            </div>
            <div className="col-md-9">
                <h1>Add Products</h1>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default AddProduct