import axios from 'axios'
import config from '../config'
import * as dotenv from 'dotenv'



dotenv.config();

export interface dataInterface{
    bitcoin : {
        usd: number
    }
}

const readMarketPrice = async (): Promise<number> => {
    const result = await axios.get(config.PRICES_API);
    const data:dataInterface = result.data;
    console.log(data.bitcoin.usd)
    return data.bitcoin.usd;
}

readMarketPrice();