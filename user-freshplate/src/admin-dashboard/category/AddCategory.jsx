import axios from "axios";
import React, { useState } from "react";
import { configpath } from "../../util/config";

export default function AddCategory() {

  const [categoryform, setForm] = useState({
      category: "",
      subcategory: "",
      description: "",
      categoryimage: null
    });

   const handleChange = (e) => {
    if (e.target.name === "categoryimage") {
      setForm({ ...categoryform, categoryimage: e.target.files[0] });
    } else {
      setForm({ ...categoryform, [e.target.name]: e.target.value });
    }
  };
   
  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
    formData.append("category", categoryform.category);
    formData.append("subcategory", categoryform.subcategory);
    formData.append("description", categoryform.description);
    formData.append("image", categoryform.categoryimage);
    
  await axios.post(configpath + "/admin/addcategory",formData);
  setForm({
      category: "",
      description: "",
      categoryimage: ""
    });
  };

  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh"
    },
    box: {
      width: "350px",
      background: "#fff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    },
    title: { fontSize: "22px", fontWeight: "bold", marginBottom: "20px" },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px"
    },
    btn: {
      width: "100%",
      padding: "12px",
      background: "#4b2e1f",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <div style={styles.title}>Add Category</div>

        <input
          style={styles.input}
          type="text"
          placeholder="Category Name"
          value={categoryform.category}
          onChange={handleChange}
          name="category"
        />
        <textarea style={styles.input} placeholder="Category Description"
        value={categoryform.description} onChange={handleChange} name="description"></textarea>
        <input type="file" style={styles.input} placeholder="Category Image"
         onChange={handleChange} name="categoryimage"/>


        <button style={styles.btn} onClick={handleSubmit}>Add Category</button>
      </div>
    </div>
  );
}
