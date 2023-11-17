import React from 'react'
import Layout from '../components/Layout';
//import { useAuth } from '../context/auth';
const HomePage = () => {
  //const [auth, setAuth]= useAuth()
  return (
    <Layout title={"Home"}>
       <header class="bg-danger py-2">
            <div class="container px-4 px-lg-5 my-5">
                <div class="text-center text-white">
                    <h3 class="display-4 fw-bolder">A Quality Books is an Ultimate Tools for Quality Education</h3>
                </div>
            </div>
        </header>
        
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </Layout>
  )
}

export default HomePage;