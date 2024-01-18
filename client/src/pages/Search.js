import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const [selectedProductQuantity, setSelectedProductQuantity] = useState({});

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button
                    class="btn btn-secondary ms-1"
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;
