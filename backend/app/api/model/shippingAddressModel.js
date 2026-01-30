import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const shippingAddressSchema = new Schema({
    userId:{type:String,required:true},
    fullname:{type:String,required:true},
    email:{type:String, required:true},
    phone:{type:String,required:true},
    housename:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    pincode:{type:String,required:true},
})


export default mongoose.model('Address',shippingAddressSchema);