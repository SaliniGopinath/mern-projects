import React, { useState } from "react";
import { FiUsers, FiUserPlus, FiChevronRight, FiList, FiBox, FiShoppingBag } from "react-icons/fi";

export default function AdminDashboard() {
  const [open, setOpen] = useState(null); // track open sidebar section
  const [activeContent, setActiveContent] = useState("Dashboard"); // track right-side content

  const toggle = (name) => {
    setOpen(open === name ? null : name);
  };

  const selectContent = (content) => {
    setActiveContent(content);
  };

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif"
    },
    sidebar: {
      width: "260px",
      background: "#f4ede6",
      padding: "20px",
      boxSizing: "border-box"
    },
    section: {
      background: "#ffffff",
      borderRadius: "16px",
      padding: "18px",
      marginBottom: "22px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
      cursor: "pointer"
    },
    itemRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      fontSize: "15px",
      color: "#4b2e1f",
      fontWeight: 500
    },
    subItem: {
      padding: "8px 18px",
      fontSize: "14px",
      color: "#6a4a3c",
      cursor: "pointer"
    },
    content: {
      flex: 1,
      padding: "30px",
      background: "#f9f9f9"
    },
    contentHeader: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px"
    },
    contentBox: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.08)"
    }
  };

  return (
    <div style={styles.container}>
      {/* ---------------------- LEFT SIDEBAR ---------------------- */}
      <div style={styles.sidebar}>
        {/* ADMIN */}
        <div style={styles.section} onClick={() => toggle("admin")}>
          <div style={styles.itemRow}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FiUsers /> Admin
            </span>
            <FiChevronRight />
          </div>
          {open === "admin" && (
            <>
              <div style={styles.subItem} onClick={() => selectContent("View Admins")}>View Admins</div>
              <div style={styles.subItem} onClick={() => selectContent("Add Admin")}>Add Admin</div>
            </>
          )}
        </div>

        {/* USERS */}
        <div style={styles.section} onClick={() => toggle("users")}>
          <div style={styles.itemRow}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FiUserPlus /> Users
            </span>
            <FiChevronRight />
          </div>
          {open === "users" && (
            <>
              <div style={styles.subItem} onClick={() => selectContent("View Users")}>View Users</div>
            </>
          )}
        </div>

        {/* CATEGORIES */}
        <div style={styles.section} onClick={() => toggle("categories")}>
          <div style={styles.itemRow}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FiList /> Categories
            </span>
            <FiChevronRight />
          </div>
          {open === "categories" && (
            <>
              <div style={styles.subItem} onClick={() => selectContent("List Categories")}>List Categories</div>
              <div style={styles.subItem} onClick={() => selectContent("Add Category")}>Add Category</div>
            </>
          )}
        </div>

        {/* PRODUCTS */}
        <div style={styles.section} onClick={() => toggle("products")}>
          <div style={styles.itemRow}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FiBox /> Products
            </span>
            <FiChevronRight />
          </div>
          {open === "products" && (
            <>
              <div style={styles.subItem} onClick={() => selectContent("View Products")}>View Products</div>
            </>
          )}
        </div>

        {/* ORDERS */}
        <div style={styles.section} onClick={() => toggle("orders")}>
          <div style={styles.itemRow}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FiShoppingBag /> Orders
            </span>
            <FiChevronRight />
          </div>
          {open === "orders" && (
            <div style={styles.subItem} onClick={() => selectContent("View Orders")}>View Orders</div>
          )}
        </div>
      </div>

      {/* ---------------------- RIGHT CONTENT AREA ---------------------- */}
      <div style={styles.content}>
        <div style={styles.contentHeader}>{activeContent}</div>
        <div style={styles.contentBox}>
          {/* Example content */}
          <p>This is the "{activeContent}" page content. You can replace this with tables, charts, or forms as needed.</p>
        </div>
      </div>
    </div>
  );
}
