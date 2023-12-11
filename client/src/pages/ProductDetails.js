import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import ncblogo from "../images/ncblogo.png";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar prod
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={
              product._id
                ? `/api/v1/product/product-photo/${product._id}`
                : ncblogo
            }
            className="card-img-top"
            alt={product.name}
            height={"500px"}
            width={"150px"}
          />
        </div>
        <div className="col-md-6">
          <h1>Product Details</h1>
          <h5>Name : {product.name}</h5>
          <h5>Description : {product.description}</h5>
          {/* <h5>Category : {product.category.name}</h5> */}
          <h5>Price : {product.price}</h5>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <div className="row">
        <h1>Similar Products</h1>
        {relatedProducts?.map((p) => (
          <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
            <img
              src={`/api/v1/product/product-photo/${p._id}`}
              className="card-img-top"
              height={"250px"}
              alt={p.name}
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description.substring(0, 30)}...</p>
              <p className="card-text">PHP {p.price}</p>
              <button className="btn btn-secondary ms-1">ADD TO CART</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
