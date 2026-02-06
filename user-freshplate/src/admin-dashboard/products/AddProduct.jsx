import axios from "axios";
import React, { useState } from "react";
import { configpath } from "../../util/config";

export default function AddProduct() {
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    formBox: {
      width: "450px",
      background: "#ffffff",
      padding: "30px",
      borderRadius: "14px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "22px",
      fontWeight: "bold",
      color: "#4b2e1f",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      height: "80px",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#4b2e1f",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    }
  };

  const [productform,setForm] = useState({
    prodname : "",
    price : "",
    prodimg : null,
    proddesc :"",
    prodcategory : ""
  })

  const handleChange = (e) => {
    if (e.target.name === "prodimg") {
      setForm({ ...productform, prodimg: e.target.files[0] });
    } else {
      setForm({ ...productform, [e.target.name]: e.target.value });
    }
  };
  

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
    formData.append("productname", productform.prodname);
    formData.append("price", productform.price);
    formData.append("productdesc", productform.proddesc);
    formData.append("productcategory", productform.prodcategory);
    formData.append("image", productform.prodimg);
  await axios.post(configpath + "/admin/addproduct",formData);
  setForm({
      prodname: "",
      price: "",
      prodimg: "",
      proddesc: "",
      prodcategory: ""
    });
  };


  return (
    <div style={styles.wrapper}>
      <div style={styles.formBox}>
        <div style={styles.heading}>Add Product</div>

        <input type="text" placeholder="Product Name" style={styles.input}
        onChange={handleChange} value={productform.prodname} name="prodname" />
        <input type="number" placeholder="Price" style={styles.input}
        onChange={handleChange} value={productform.price} name="price" />
        
        <input type="file" style={styles.input} onChange={handleChange} 
         name="prodimg"/>

        <textarea placeholder="Product Description" style={styles.textarea} 
        onChange={handleChange} value={productform.proddesc} name="proddesc"></textarea>

        <input type="text" placeholder="Category" style={styles.input}
        onChange={handleChange} value={productform.prodcategory} name="prodcategory"/>

        <button style={styles.button} onClick={handleSubmit}>Add Product</button>
      </div>
    </div>
  );
}
