import orderModel from "../model/orderModel.js";
import shippingAddressModel from "../model/shippingAddressModel.js"

const addressController = async(req,res) =>{
    try{
        const { userId,fullname, email, phone, housename,city,state,pincode } = req.body;
        const data = await shippingAddressModel.create({  userId,fullname, email, phone, housename,city,state,pincode });  
        return res.status(201).json({message:"Address added successfully",data});
    }
    catch(err){
       console.log("Error while adding address:", err);
        return res.status(400).json({ error: err.message });
    }
}
export default addressController;

export const getAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    const address = await shippingAddressModel.find({ userId }).sort({  _id: -1 });

    return res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching address",
      error: error.message,
    });
  }
};

export const addOrderController = async(req,res) =>{
    try{
        const { userId,cartItems,amount,address} = req.body;
        const data = await orderModel.create( { userId,cartItems,amount,address});  
        return res.status(201).json({message:"Order added successfully",data});
    }
    catch(err){
       console.log("Error while adding order", err);
        return res.status(400).json({ error: err.message });
    }
}

export const getOrders = async(req,res)=>{
   try{
    const orders = await orderModel.find();
    return res.status(200).json(orders);
   }
   catch(err){
    return res.status(400).json({ message: "Error fetching orders", error });
   }
}

