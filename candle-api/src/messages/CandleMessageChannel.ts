import { Channel, connect, ConsumeMessage } from 'amqplib'
import { Server } from 'socket.io'
import config from '../../cofig'
import * as http from 'http'
import CandleController from '../controllers/CandleController'
import { Candle } from '../models/CandleModel'


export default  class CandleMessageChannel{
    private _channel : Channel | undefined
    private _candleCtrl: CandleController
    private _io: Server

    constructor(server:http.Server){
        this._candleCtrl = new CandleController();
        this._io = new Server(server, {
            cors: {
                origin: config.SOCKET_CLIENT_SERVER,
                methods: ["GET", "POST"]
            }
        })
        this._io.on('connection', () => {
            console.log("Web socket connection created")
        })

        this._createMessageChannel();
    }

    private async _createMessageChannel(){
        try{
            const connection = await connect(config.AMQP_SERVER)
            this._channel = await connection.createChannel()
            this._channel.assertQueue(config.QUEUE)
        }catch(err){
            console.log("Connection to RabbitMQ failled")
        }
    }

    public consumeMessages(){
        this._channel?.consume(config.QUEUE, async(msg:ConsumeMessage | null) => {
            const candleObj = JSON.parse(msg.content.toString())
            console.log('Message received')

            this._channel.ack(msg)

            const candle: Candle = candleObj
            await this._candleCtrl.save(candle)
            this._io.emit(config.SOCKET_EVENT_NAME, candle)
            console.log("New candle emitted by web socket")
        })

        console.log("Candle consumer started")
    }
}