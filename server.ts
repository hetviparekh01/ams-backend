import express from "express"
import cors from "cors"
import { connectDB } from "./src/db/connect"
import config from "config"
import route from "./src/routes"
const app=express()
app.use(express.json())
app.use(cors())
app.use('/api',route)
const port=config.get("port")
app.listen(port,()=>{
    console.log(`server is connecting to port ${port}`)
    connectDB()
    .then(()=>{
        console.log("DB Connected !!");
    })
    .catch((error)=>{
        console.log(`Error in Connecting DB!! ${error}`);
    })
})