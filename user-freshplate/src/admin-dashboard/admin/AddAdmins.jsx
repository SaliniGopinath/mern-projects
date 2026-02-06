import React, { useState } from "react";
import { configpath } from "../../util/config";
import axios from 'axios'

export default function AddAdmin() {
  const [adminform, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...adminform,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Admin added:", adminform);
    await axios.post(configpath + "/admin/addadmin", adminform);
    alert("New admin added successfully!");
    setForm({ username: "", email: "", password: "" });
  };

  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh"
    },
    formBox: {
      width: "400px",
      background: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "22px",
      fontWeight: "bold"
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px"
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#4b2e1f",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.formBox}>
        <div style={styles.title}>Add Admin</div>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={adminform.username}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={adminform.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={adminform.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Add Admin</button>
      </form>
    </div>
  );
}
