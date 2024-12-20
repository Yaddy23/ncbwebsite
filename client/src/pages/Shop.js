import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import toast from "react-hot-toast";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import ncblogo from "../images/ncblogo.png";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState({});
  const navigate = useNavigate();

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

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products "}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-4">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "20rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  height={"250px"}
                  alt={ncblogo}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="cart-text">Product Quantity: {p.quantity}</p>
                  <p className="card-text">${p.price}</p>
                  <div className="d-flex align-items-center mb-2">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleDecrement(p._id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={selectedProductQuantity[p._id] || 1}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setSelectedProductQuantity((prevQuantities) => ({
                          ...prevQuantities,
                          [p._id]: value || 1,
                        }));
                      }}
                      className="form-control me-2 input-smaller"
                    />
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleIncrement(p._id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    MORE DETAILS
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      const quantityToAdd = selectedProductQuantity[p._id] || 1;
                      const index = cart.findIndex(
                        (item) => item._id === p._id
                      );
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
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
