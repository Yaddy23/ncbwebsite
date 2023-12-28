import React from "react";
import Layout from "./../components/Layout";
import UserMenu from "../components/UserMenu";
import { useAuth } from "../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title="Dashboard">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>
                Name : {auth?.user?.firstName} {auth?.user?.lastName}{" "}
              </h1>
              <h1>Email : {auth?.user?.email}</h1>
              <h1>Contact : {auth?.user?.phone}</h1>
              <h1>Address : {auth?.user?.address}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
