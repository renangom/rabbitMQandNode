import path from "path";
import dotenv from 'dotenv'

dotenv.config({path: path.resolve(__dirname, "./.env")})

interface ENV{
    PORT:string | undefined
    AMQP_SERVER: string | undefined
    QUEUE: string | undefined

    SOCKET_EVENT_NAME: string | undefined
    SOCKET_CLIENT_SERVER:string | undefined
    MONGO_URI : string | undefined
}

interface Config{
    PORT:string
    AMQP_SERVER:string
    QUEUE: string

    SOCKET_EVENT_NAME: string
    SOCKET_CLIENT_SERVER: string

    MONGO_URI: string
}


const getConfig = ():ENV => {
    return {
        PORT : process.env.PORT,
        AMQP_SERVER: process.env.AMQP_SERVER,
        QUEUE: process.env.QUEUE,

        SOCKET_CLIENT_SERVER: process.env.SOCKET_CLIENT_SERVER,
        SOCKET_EVENT_NAME: process.env.SOCKET_EVENT_NAME,
        MONGO_URI: process.env.MONGO_URI

    }
}

const getSanitzedConfig = (config:ENV): Config => {
    for(const [key, value] of Object.entries(config)){
        if(value === undefined){
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config as Config
} 

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;