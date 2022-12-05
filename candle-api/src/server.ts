import { app } from "./app";
import config from '../cofig'
import {connectToMongo} from './config/db'
import {connection} from 'mongoose'
import CandleMessageChannel from './messages/CandleMessageChannel'



const createServer = async () => {

    await connectToMongo()
    const PORT = Number(config.PORT);
    const server = app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)

    const candleMsgChannel = new CandleMessageChannel(server)
    candleMsgChannel.consumeMessages();

    process.on("SIGINT", async () =>  {
       await connection.close()
       server.close()
       console.log("Server and db connection closed")
    })
})
}