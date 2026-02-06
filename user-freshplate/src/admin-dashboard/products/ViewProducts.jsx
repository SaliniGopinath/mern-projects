import axios from "axios";
import React, { useEffect, useState } from "react";
import { configpath } from "../../util/config";
import { Button } from "react-bootstrap";


export default function ViewUsers() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(configpath + "/admin/getproducts");
        setProducts(response.data.data.products);  
        console.log("prod",response.data.data.products);

      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    box: {
      width: "650px",
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
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
    },
    th: {
      background: "#f3ebe4",
      padding: "12px",
      borderBottom: "2px solid #ddd",
      textAlign: "left",
      fontSize: "15px",
      color: "#4b2e1f",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #eee",
      fontSize: "14px",
    }
  };

 
  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <div style={styles.heading}>Products</div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Product Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Image</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td style={styles.td}>{p.productname}</td>
                <td style={styles.td}>{p.price}</td>
                <td style={styles.td}>{p.productdesc}</td>
                <td style={styles.td}>{p.productcategory}</td>
                <td style={styles.td}>{p.productimage != null ? 
                    <img className="rounded-circle mb-2" src={configpath + p.productimage} style={{width:'50px',height:'50px'}}/>
                    :'no image'
                  }{console.log("IMAGE URL:", configpath + p.productimage)}
                </td>

                {/* <td>
                 <Button
                      style={{
                      backgroundColor: "#A67B5B",
                      borderColor: "#A67B5B",
                      padding: "4px 10px",
                      fontSize: "13px",
                      color: "white"
                    }}
                    onClick={()=>deleteUser(u._id)}
                    >
                      Delete
                  </Button> */}
                {/* </td> */}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
