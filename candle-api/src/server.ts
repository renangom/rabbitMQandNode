import { app } from "./app";
import config from '../cofig'
import {connectToMongo} from './config/db'
import {connection} from 'mongoose'



const createServer = async () => {

    await connectToMongo()
    const PORT = Number(config.PORT);
    const server = app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)

    process.on("SIGINT", async () =>  {
       await connection.close()
       server.close()
       console.log("Server and db connection closed")
    })
})
}