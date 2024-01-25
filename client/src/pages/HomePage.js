import React from "react";
import Layout from "../components/Layout";
import books from "../images/books.webp";
//import { useAuth } from '../context/auth';
const HomePage = () => {
  //const [auth, setAuth]= useAuth()
  return (
    <Layout title={"Home"}>
      <section id="hero" class="hero d-flex align-items-center section-bg">
        <div class="container">
          <div class="row justify-content-between gy-5">
            <div class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
              <h2 data-aos="fade-up">
                Greetings, <br />
                book lovers!
              </h2>
              <p data-aos="fade-up" data-aos-delay="100">
                Dive into a realm of endless possibilities as you browse through
                our extensive collection of books. Whether you're seeking
                thrilling fiction or insightful non-fiction, our online
                bookstore is your gateway to a universe of knowledge and
                entertainment. Happy exploring!
              </p>
              <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
                <a href="#book-a-table" class="btn-book-a-table">
                  Click Here To Shop Now
                </a>
              </div>
            </div>
            <div class="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
              <img
                src={books}
                class="img-fluid"
                alt=""
                data-aos="zoom-out"
                data-aos-delay="300"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </Layout>
  );
};

export default HomePage;
