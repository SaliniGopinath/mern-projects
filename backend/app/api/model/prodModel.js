import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productname:{type:String,required:true},
    price:{type:String, required:true},
    productimage:{type:String,required:true},
    productdesc:{type:String,required:true},
    productcategory:{type:String,required:true}
})


export default mongoose.model('Product',productSchema);