import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminMenu = () => {
  return (
    <>
    <div className="text-center">
        <div className="list-group">
        <h4>Admin Panel</h4>
        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
            List of Products
        </NavLink>
        <NavLink to="/dashboard/admin/add-category" className="list-group-item list-group-item-action">
            Add Category
        </NavLink>
        <NavLink to="/dashboard/admin/add-product" className="list-group-item list-group-item-action">
            Add Product
        </NavLink>
        <NavLink to="/dashboard/admin/view-users" className="list-group-item list-group-item-action">
            Users
        </NavLink>
        </div>
    </div>
    </>
  )
}

export default AdminMenu