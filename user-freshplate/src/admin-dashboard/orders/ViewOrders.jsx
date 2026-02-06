import axios from "axios";
import React, { useEffect, useState } from "react";
import { configpath } from "../../util/config";


export default function ViewUsers() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(configpath + "/order/getuser");
        setOrders(response.data);  
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    box: {
      width: "950px",
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
        <div style={styles.heading}>Orders</div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>OrderID</th>
              <th style={styles.th}>UserID</th>
              <th style={styles.th}>Order</th>
              <th style={styles.th}>Total</th>
              {/* <th style={styles.th}>Shipping Address</th> */}
            </tr>
          </thead>

          <tbody>
            {orders.map((o, index) => (
              <tr key={index}>
                <td style={styles.td}>{o._id}</td>
                <td style={styles.td}>{o.userId}</td>
                <td style={styles.td}>
                    {o.cartItems.map((item, index) => (
                      <div key={index}>
                        {item.productname}{' x '}{item.quantity}
                      </div>
                    ))}
                  </td>
                <td style={styles.td}>{o.amount}</td>
                {/* <td style={styles.td}>{o.address}</td> */}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
