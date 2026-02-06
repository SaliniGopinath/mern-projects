import React from "react";
import Header from "./components/Header";
import UserBody from "./components/UserBody";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp";
import Menu from "./components/Menu";
import AdminDashboard from "./admin-dashboard/AdminDashboard";
import AddAdmin from "./admin-dashboard/admin/AddAdmins";
import ViewAdmins from "./admin-dashboard/admin/ViewAdmins";
import ViewUsers from "./admin-dashboard/user/ViewUsers";
import ListCategories from "./admin-dashboard/category/ListCategory";
import AddCategory from "./admin-dashboard/category/AddCategory";
import ViewOrders from "./admin-dashboard/orders/ViewOrders";
import ViewProducts from "./admin-dashboard/products/ViewProducts";
import AddProduct from "./admin-dashboard/products/AddProduct";
import Cart from "./components/Cart";
import ShippingAddress from "./components/ShippingAddress";
import OrderSummary from "./components/OrderSummary";
import OrderSuccess from "./components/OrderSuccess";

function App() {
  return (
    <BrowserRouter>
    <div style={{ backgroundColor: "#f4ebdd", minHeight: "100vh" }}>
      <Header />
      <Routes>
        <Route path="/" element={<UserBody />} />
        <Route path="/about" element={<UserBody />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/view" element={<ViewAdmins />} />
        <Route path="/admin/add" element={<AddAdmin />} />
        
        <Route path="/users/view" element={<ViewUsers />} />
        <Route path="/categories/list" element={<ListCategories />} />
        <Route path="/categories/add" element={<AddCategory/>} />
        
     <Route path="/products/view" element={<ViewProducts />} />
     <Route path="/products/add" element={<AddProduct />} />
      <Route path="/orders/view" element={<ViewOrders />} />
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/address" element={<ShippingAddress/>}/>
       <Route path="/ordersummary" element={<OrderSummary/>}/>
       <Route path="/ordersuccess" element={<OrderSuccess/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;



