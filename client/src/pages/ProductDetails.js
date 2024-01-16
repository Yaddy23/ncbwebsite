import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import ncblogo from "../images/ncblogo.png";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = (productId) => {
    setSelectedProductQuantity((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    if (quantity > 1) {
      setSelectedProductQuantity((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 1) - 1,
      }));
    }
  };

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
          <h5 className="cart-text">Product Quantity: {product.quantity}</h5>
          <h5>Price : {product.price}</h5>
          <div className="d-flex align-items-center mb-2">
            <h5>Order Quantity: &nbsp;</h5>
            <button
              className="btn btn-sm btn-outline-secondary me-2 ml-2"
              onClick={() => handleDecrement(product._id)}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={selectedProductQuantity[product._id] || 1}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setSelectedProductQuantity((prevQuantities) => ({
                  ...prevQuantities,
                  [product._id]: value || 1,
                }));
              }}
              className="form-control me-2 input-smaller"
            />
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => handleIncrement(product._id)}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              const quantityToAdd = selectedProductQuantity[product._id] || 1;
              const index = cart.findIndex((item) => item._id === product._id);
              if (quantityToAdd <= product.quantity) {
                if (index !== -1) {
                  const updatedCart = [...cart];
                  updatedCart[index].quantity += quantityToAdd;
                  setCart(updatedCart);
                } else {
                  setCart([...cart, { ...product, quantity: quantityToAdd }]);
                }
                toast.success("Item Added To Cart");
              } else {
                toast.error("Invalid Quantity to Order");
              }
            }}
          >
            ADD TO CART
          </button>
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
              <button
                className="btn btn-secondary ms-1"
                onClick={() => {
                  const quantityToAdd = selectedProductQuantity[p._id] || 1;
                  const index = cart.findIndex((item) => item._id === p._id);
                  if (quantityToAdd <= p.quantity) {
                    if (index !== -1) {
                      const updatedCart = [...cart];
                      updatedCart[index].quantity += quantityToAdd;
                      setCart(updatedCart);
                    } else {
                      setCart([...cart, { ...p, quantity: quantityToAdd }]);
                    }
                    toast.success("Item Added To Cart");
                  } else {
                    toast.error("Invalid Quantity to Order");
                  }
                }}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
