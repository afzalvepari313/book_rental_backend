import app from './app';
import mongoose from 'mongoose';
const port = process.env.PORT || 5000;

// MongoDB Connection
async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI!)

        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("Connect to DB")
        })

        connection.on('error',(error)=>{
            console.log("Something is wrong in mongodb ",error)
        })
    } catch (error) {
        console.log("Something is wrong ",error)
    }
}
app.listen(port, () => {
    connectDB();
  console.log(`Server running on port ${port}`);
});
