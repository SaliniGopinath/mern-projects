import cartModel from "../model/cartModel.js";
const cartController = async(req,res) =>{
    try{
        let { userId,productId,productname,price,quantity } = req.body;
        quantity = Number(quantity);
        const existingItem = await cartModel.findOne({ userId, productId });
         if (existingItem) {
           existingItem.quantity = Number(existingItem.quantity) + quantity;
          await existingItem.save();
           return res.status(200).json({
        message: "Cart quantity updated",
        data: existingItem
      });
         } 
      const data = await cartModel.create({ userId,productId,productname,price,quantity});  
        return res.status(201).json({message:"Added to cart ",data});
    }
    catch(err){
       console.log("Error adding to cart", err);
        return res.status(400).json({ error: err.message });
    }
}
export default cartController;

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await cartModel.find({ userId });

    return res.status(200).json({
      success: true,
      data: cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};


export const editCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cartItem = await cartModel.findOne({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cartItem.quantity = Number(quantity);
    await cartItem.save();

    return res.status(200).json({
      message: "Cart quantity updated",
      cartItem
    });
  } catch (err) {
    console.log("Edit cart error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteCart = async(req,res)=>{
    try{
       const { userId } = req.params;
        const cart = await cartModel.deleteMany({userId});
        
                if (!cart) {
                return res.status(404).json({ status: 'error',message: 'Cart not found' });
                }
                res.status(200).json({ status : 'success',message: 'Cart deleted successfully' });
    }
    catch(err){
        res.status(500).json({ status: 'error',error: err.message });
    }
}


