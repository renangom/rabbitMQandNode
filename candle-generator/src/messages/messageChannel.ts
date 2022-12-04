import config from '../../config';
import {Channel, connect} from 'amqplib'


export const createMessageChannel = async ():Promise<Channel | null > => {
    try{
        const connection = await connect(config.AMQP_SERVER);
        const channel = await connection.createChannel()
        await channel.assertQueue(config.QUEUE_NAME);
        return channel;
    }catch(err){
        console.log("Error while trying to connect to rabbitmq");
        console.log(err);
        return null;
    }
}