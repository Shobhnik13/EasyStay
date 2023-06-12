const mongoose=require('mongoose')
const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            
        })
        console.log(`mongo db connected ${conn.connection.host}`)
    }
    catch(error){
        console.log(`error:${error.message}`)
        process.exit()
    }
}
module.exports=connectDb;