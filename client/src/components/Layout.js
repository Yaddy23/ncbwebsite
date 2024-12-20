import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet"
import { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';



const Layout = ({children,title,description,keywords,author}) => {
    return(
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />

                <title>{title}</title>
            </Helmet>

            <Header/>
            <main style ={{ minHeight: "90vh"}}>
                <Toaster />

               {children} 
            </main>
            <Footer/>
        </div>
    );
};

Layout.defaultProps = {
    title: 'New Century Books',
    description: 'ecommerce shop',
    keywords: 'mern,react,node,mngodb',
    author: "Yad",
};

export default Layout;
