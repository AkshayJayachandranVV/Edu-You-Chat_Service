import {INotification,IRoomIdsArray,IStoreNotificationData } from "../../domain/entities/INotification";
import {NotificationRepository} from "../../domain/repositories/NotificationRepository";
import dotenv from 'dotenv';


dotenv.config();

export class   NotificationService {
    
    private notificationRepo: NotificationRepository;

    constructor() {
        this.notificationRepo = new NotificationRepository();
    }

   
    async storeNotification(data: IStoreNotificationData) {  // Change return type to IChat or null
        try {
            console.log(data, "data in createRoom");

            const {  roomId,content} = data.message;

            const username = data.username

            const coursename = data.coursename

            const thumbnail = data.thumbnail

            const saveNotification = await this.notificationRepo.storeNotification(data);
            return saveNotification;  // Return single IChat object

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }
    
   
    async fetchNotification(data:IRoomIdsArray ) {  // Change return type to IChat or null
        try {
            console.log(data, "data in fetchNotification");

            const saveNotification = await this.notificationRepo.fetchNotification(data);
            return saveNotification;  // Return single IChat object

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }


    
}



