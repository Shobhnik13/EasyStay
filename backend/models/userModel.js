const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})
// encrypting password before saving in db
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
     const salt=await bcrypt.genSalt(10)
     this.password=await bcrypt.hash(this.password,salt)
})
// login -decrypting and compariung the existing user password with the db one 
userSchema.methods.matchPassword=async function(enteredPassword){
      return await bcrypt.compare(enteredPassword,this.password)
}
const user=mongoose.model('user',userSchema)
module.exports=user