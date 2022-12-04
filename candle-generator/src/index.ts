import config from '../config'
import * as dotenv from 'dotenv'
import Period from './enums/Periodo';
import Candle from './models/Candle';

import axios from 'axios'
import { createMessageChannel } from './messages/messageChannel';



interface PriceBitcoin{
        bitcoin:{
            usd:number
        }
}


dotenv.config();

const readMarketPrice = async ():Promise<number> => {
    const result =  await axios.get(config.PRICES_API, {
        headers: {
            "accept-encoding" : null
        }
    });
    const price = result.data.bitcoin.usd;
    console.log(price);
    return price;
}

    

const generateCandles = async () => {

    const messageChannel = await createMessageChannel()
    if(messageChannel){
        while(true){
            const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS;
            const candle = new Candle('BTC', new Date());
    
            console.log("==========================================")
            console.log("GENERATING NEW CANDLE")
            for(let i = 0; i < loopTimes; i++){
                const price = await readMarketPrice();
                candle.addValue(price);
                console.log(`Market price number #${i+1}`)
    
                await new Promise(r => setTimeout(r, Period.TEN_SECONDS));
            }
    
            candle.closeCandle();
            console.log("Candle closed!!!");
            const candleObj = candle.toSimpleObject();
            console.log(candle.toSimpleObject());
            const jsonCandle = JSON.stringify(candleObj);
            messageChannel.sendToQueue(config.QUEUE_NAME, Buffer.from(jsonCandle))
        }
    }
}

generateCandles();

