import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt';
const signupController = async(req,res) =>{
    try{
        const { fullname, email, password, phone } = req.body;
        const data = await userModel.create({ fullname, email, password, phone });  
        return res.status(201).json({message:"User registered successfully",data});
    }
    catch(err){
       console.log("Signup error:", err);
        return res.status(400).json({ error: err.message });
    }
}

export default signupController;

export const loginController = async(req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            console.log("user not found");
            return res.status(404).json({message:"User not found!!!"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            console.log("paswd wrong");
            return res.status(404).json({message:"Password Incorrect!!"})
        }
        return res.status(201).json({message:"User logged in  successfully",data: user});

    }
    catch(err){
         return res.status(400).json({ error: err.message });
    }
}


export const getUsers = async(req,res)=>{
   try{
    const users = await userModel.find();
    return res.status(200).json(users);
   }
   catch(err){
    return res.status(400).json({ message: "Error fetching users", error });
   }
}

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; 
    console.log('id',userId);
    
    const user = await userModel.findById(userId); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: "Error fetching user", error: err.message });
  }
};


export const deleteUser = async(req,res)=>{
    try{
        console.log("id",req.params.id);
        
        const user = await userModel.findByIdAndDelete(req.params.id);
        
                if (!user) {
                return res.status(404).json({ status: 'error',message: 'User not found' });
                }
                res.status(200).json({ status : 'success',message: 'User deleted successfully' });
    }
    catch(err){
        res.status(500).json({ status: 'error',error: err.message });
    }
}
