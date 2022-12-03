import path from 'path'
import dotenv from 'dotenv'

dotenv.config({path: path.resolve(__dirname, "./.env")})


interface ENV{
    PRICES_API: string | undefined;
}

interface Config{
    PRICES_API: string;
}


const getConfig = (): ENV => {
    return {
        PRICES_API: process.env.PRICES_API
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