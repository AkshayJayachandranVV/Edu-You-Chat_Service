import {chatController} from '../../interface/controllers/chatController'
import {notificationController} from '../../interface/controllers/notificationController'
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
            case 'save-media' :
                console.log('Handling operation',operations,data);
                response = await chatController.storeFile(data)
                console.log("data reached inside message handler.ts",response);
                break;
            case 'user-fetch-chat' :
                console.log('Handling operation',operations,data);
                response = await chatController.fetchChat(data)
                console.log("data reached inside message handler.ts",response);
                break;
            case 'store-notification' :
                console.log('Handling operation',operations,data);
                response = await notificationController.storeNotification(data)
                console.log("data reached inside message handler.ts",response);
                break;
            case 'fetch-notification' :
                    console.log('Handling operation',operations,data);
                    response = await notificationController.fetchNotification(data)
                    console.log("data reached inside message handler.ts",response);
                    break;
            case 'fetch-last-message' :
                    console.log('Handling operation',operations,data);
                    response = await chatController.fetchLastMessage(data)
                    console.log("data reached inside message handler.ts",response);
                    break;
            case 'update-read-messages' :
                    console.log('Handling operation',operations,data);
                    response = await chatController.updateReadMessage(data)
                    console.log("data reached inside message handler.ts",response);
                    break;
            case 'update-read-status' :
                    console.log('Handling operation',operations,data);
                    response = await chatController.updateReadStatus(data)
                    console.log("data reached inside message handler.ts",response);
                    break;

             case 'update-read-users' :
                    console.log('Handling operation',operations,data);
                    response = await chatController.updateReadUsers(data)
                    console.log("data reached inside message handler.ts",response);
                    break;

             case 'fetch-group-members' :
                        console.log('Handling operation',operations,data);
                        response = await chatController.fetchGroupMembers(data)
                        console.log("data reached inside message handler.ts",response);
                        break;
                                 
                                           
        }

        await RabbitMQClient.produce(response,correlationId,replyTo)

    }
}











