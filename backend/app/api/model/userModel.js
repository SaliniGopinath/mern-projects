import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';
const saltRounds = 10;
const userSchema = new Schema({
    fullname:{type:String,required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,required:true}
})
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, saltRounds);
});


export default mongoose.model('User',userSchema);