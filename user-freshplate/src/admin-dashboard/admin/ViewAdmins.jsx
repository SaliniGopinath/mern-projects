import axios from "axios";
import React, { useEffect, useState } from "react";
import { configpath } from "../../util/config";
import { Button } from "react-bootstrap";


export default function ViewAdmin() {
  const [admin, setAdmin] = useState([]);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(configpath + "/admin/getadmin");
        setAdmin(response.data);  
      } catch (err) {
        console.log(err);
      }
    };

    fetchAdmin();
  }, []);

 const deleteAdmin = async(id) =>{
  console.log("id",id);
  await axios.delete(configpath + `/admin/deleteadmin/${id}`)
  setAdmin(a => a.filter(admin=>admin._id!== id))
 }
  
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
        <div style={styles.heading}>Admin</div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}></th>
            </tr>
          </thead>

          <tbody>
            {admin.map((a, index) => (
              <tr key={index}>
                <td style={styles.td}>{a.username}</td>
                <td style={styles.td}>{a.email}</td>
                <td>
                 <Button
                      style={{
                      backgroundColor: "#A67B5B",
                      borderColor: "#A67B5B",
                      padding: "4px 10px",
                      fontSize: "13px",
                      color: "white"
                    }}
                    onClick={()=>deleteAdmin(a._id)}
                    >
                      Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
