import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ViewAdmins from "./admin/ViewAdmins";
import AddAdmin from "./admin/AddAdmins";
import ViewUsers from "./user/ViewUsers";
import ListCategories from "./category/ListCategory";
import AddCategory from "./category/AddCategory";
import ViewProducts from "./products/ViewProducts";
import ViewOrders from "./orders/ViewOrders";

export default function Dashboard() {
  const [open, setOpen] = useState(null);

  const toggle = (name) => setOpen(open === name ? null : name);

  const styles = {
    container: { display: "flex", minHeight: "100vh" },
    sidebar: { width: "260px", background: "#f4ede6", padding: "20px" },
    section: {
      background: "#fff",
      borderRadius: "16px",
      padding: "18px",
      marginBottom: "20px",
      cursor: "pointer"
    },
    subItem: {
      padding: "8px 18px",
      display: "block",
      textDecoration: "none",
      color: "#6a4a3c"
    },
    content: { flex: 1, padding: "30px", background: "#fafafa" }
  };

  return (
    // <BrowserRouter>
      <div style={styles.container}>

        
        <div style={styles.sidebar}>
          {/* Admin */}
          <div style={styles.section} onClick={() => toggle("admin")}>
            <b>Admin</b>
          </div>
          {open === "admin" && (
            <>
              <Link to="/admin/view" style={styles.subItem}>View Admins</Link>
              <Link to="/admin/add" style={styles.subItem}>Add Admin</Link>
            </>
          )}

          {/* Users */}
          <div style={styles.section} onClick={() => toggle("users")}>
            <b>Users</b>
          </div>
          {open === "users" && (
            <Link to="/users/view" style={styles.subItem}>View Users</Link>
          )}

          {/* Categories */}
          <div style={styles.section} onClick={() => toggle("categories")}>
            <b>Categories</b>
          </div>
          {open === "categories" && (
            <>
              <Link to="/categories/list" style={styles.subItem}>List Categories</Link>
              <Link to="/categories/add" style={styles.subItem}>Add Category</Link>
            </>
          )}

          {/* Products */}
          <div style={styles.section} onClick={() => toggle("products")}>
            <b>Products</b>
          </div>
          {open === "products" && (
            <>
              <Link to="/products/view" style={styles.subItem}>View Products</Link>
            <Link to="/products/add" style={styles.subItem}>Add Products</Link>
            </>
            
          )}

          {/* Orders */}
          <div style={styles.section} onClick={() => toggle("orders")}>
            <b>Orders</b>
          </div>
          {open === "orders" && (
            <Link to="/orders/view" style={styles.subItem}>View Orders</Link>
          )}
        </div>

        
        <div style={styles.content}>
          <Routes>
            <Route path="/admin/view" element={<ViewAdmins />} />
            <Route path="/admin/add" element={<AddAdmin />} />

            <Route path="/users/view" element={<ViewUsers />} />

            <Route path="/categories/list" element={<ListCategories />} />
            <Route path="/categories/add" element={<AddCategory />} />

            <Route path="/products/view" element={<ViewProducts />} />

            <Route path="/orders/view" element={<ViewOrders />} />

            
            <Route path="*" element={<h2>Welcome to Dashboard</h2>} />
          </Routes>
        </div>

      </div>
    // </BrowserRouter>
  );
}
