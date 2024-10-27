import {chatController} from '../../interface/controllers/chatController'
import RabbitMQClient from './client'


export default class MessageHandlers {
    static async handle(operations : string, data : any, correlationId : string, replyTo:string){
        let response
        switch(operations){
            case 'create-chat-room' :
                console.log('Handling operation',operations,data);
                response = await chatController.createRoom(data)
                console.log("data reached inside message handler.ts",response);
                break;
            case 'save-message' :
                console.log('Handling operation',operations,data);
                response = await chatController.saveMessage(data)
                console.log("data reached inside message handler.ts",response);
                break;
            case 'user-fetch-chat' :
                console.log('Handling operation',operations,data);
                response = await chatController.fetchChat(data)
                console.log("data reached inside message handler.ts",response);
                break;
            case 'save-media' :
                console.log('Handling operation',operations,data);
                response = await chatController.storeFile(data)
                console.log("data reached inside message handler.ts",response);
                break;
                                           
        }

        await RabbitMQClient.produce(response,correlationId,replyTo)

    }
}











