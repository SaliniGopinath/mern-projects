import adminModel from "../model/adminModel.js";
import prodModel from "../model/prodModel.js";
import multer from "multer";
import fileupload from "../middleware/upload.js";
import categoryModel from "../model/categoryModel.js";
const addproductController = async(req,res,next) =>{
    try{
        var upload = multer({
            storage : fileupload.files.storage(),
            limits : {
                fileSize: 2000000
            },
            fileFilter(req,file,cb){
                if(!file.originalname.match(/\.(png|jpg)$/)){
                    return res.json({status : "failed", message : "Please upload an image"})
                }
                cb(undefined,true)
            }
        }).single('image')
        upload(req,res,async function(err){
            if(err instanceof multer.MulterError){
                res.json({status:"failed", message: "Something went wrong ", error:err});
            }
            else if(err){
              res.json({status:"failed", message: "Something went wrong ", error:err});
            }
            else{
                var data = {
                    productname : req.body.productname,
                    price: req.body.price,
                    productimage : req.file? req.file.filename : null ,
                    productdesc : req.body.productdesc,
                    productcategory: req.body.productcategory
                };
        try {
            await prodModel.create(data);
            return res.json({
                status: "success",
                message: "Product added successfully"
            });
            } catch (err) {
            return res.status(500).json({
                status: "failed",
                message: err.message
            });
            }
            }
        });
    }
    catch(err){
       console.log("Error while adding product:", err);
        return res.status(400).json({ error: err.message });
    }
}

export default addproductController;

export const getProducts = async(req,res,next)=>{
    let productlist = [];
   try{
    let products = await prodModel.find();
    
            for(let prod of products){
                productlist.push({
                    productId:prod._id,
                    productname: prod.productname,
                    price : prod.price,
                    productimage : (prod.productimage != null) ? "/files/" + prod.productimage : null,
                    productdesc : prod.productdesc,
                    productcategory: prod.productcategory
                })
            }
            return res.json({status:"success", message:"product list found",data:{products:productlist}})
        
   }
   catch(err){
    return res.status(400).json({ message: "Error fetching users", err });
   }
}

export const addadminController = async(req,res) =>{
    try{
        const { username, email, password } = req.body;
        const data = await adminModel.create({username, email, password});  
        return res.status(201).json({message:"Admin Added successfully",data});
    }
    catch(err){
       console.log("Error while adding product:", err);
        return res.status(400).json({ error: err.message });
    }
}

export const getAdmin = async(req,res)=>{
   try{
    const admin = await adminModel.find();
    return res.status(200).json(admin);
   }
   catch(err){
    return res.status(400).json({ message: "Error fetching admin", error });
   }
}

export const deleteAdmin = async(req,res)=>{
    try{
        const admin = await adminModel.findByIdAndDelete(req.params.id);
        
                if (!admin) {
                return res.status(404).json({ status: 'error',message: 'Admin not found' });
                }
                res.status(200).json({ status : 'success',message: 'Admin deleted successfully' });
    }
    catch(err){
        res.status(500).json({ status: 'error',error: err.message });
    }
}

export const addcategoryController = async(req,res,next) =>{
    try{
        var upload = multer({
            storage : fileupload.files.storage(),
            limits : {
                fileSize: 2000000
            },
            fileFilter(req, file, cb) {
                    if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
                        return cb(new Error("Please upload an image (png, jpg, jpeg)"));
                    }
                    cb(null, true);
                    }

        }).single('image')
        upload(req,res,async function(err){
            if(err instanceof multer.MulterError){
                res.json({status:"failed", message: "Something went wrong ", error:err});
            }
            else if(err){
              res.json({status:"failed", message: "Something went wrong ", error:err});
            }
            else{
                var data = {
                    category : req.body.category,
                    description : req.body.description,
                    categoryimage : req.file? req.file.filename : null
                };
        try {
            await categoryModel.create(data);
            return res.json({
                status: "success",
                message: "Category added successfully"
            });
            } catch (err) {
            return res.status(500).json({
                status: "failed",
                message: err.message
            });
            }
            }
        });
    }
    catch(err){
       console.log("Error while adding category:", err);
        return res.status(400).json({ error: err.message });
    }
}


export const getCategories = async(req,res,next)=>{
    let categorylist = [];
   try{
    let category = await categoryModel.find();
    
            for(let cat of category){
                categorylist.push({
                    category: cat.category,
                    description : cat.description,
                    categoryimage : (cat.categoryimage != null) ? "/files/" + cat.categoryimage : null
                    
                })
            }
            return res.json({status:"success", message:"category list found",data:{category:categorylist}})
        
   }
   catch(err){
    return res.status(400).json({ message: "Error fetching category", err });
   }
}
