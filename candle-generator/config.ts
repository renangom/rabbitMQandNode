import path from 'path'
import dotenv from 'dotenv'

dotenv.config({path: path.resolve(__dirname, "./.env")})


interface ENV{
    PRICES_API: string | undefined;
    QUEUE_NAME: string | undefined;
    AMQP_SERVER: string | undefined;
}

interface Config{
    PRICES_API: string;
    QUEUE_NAME: string;
    AMQP_SERVER: string;
}


const getConfig = (): ENV => {
    return {
        PRICES_API: process.env.PRICES_API,
        QUEUE_NAME: process.env.QUEUE_NAME,
        AMQP_SERVER: process.env.AMQP_SERVER
    }
}

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in .env`);
      }
    }
    return config as Config;
  };
  
  const config = getConfig();
  
  const sanitizedConfig = getSanitzedConfig(config);
  
  export default sanitizedConfig;