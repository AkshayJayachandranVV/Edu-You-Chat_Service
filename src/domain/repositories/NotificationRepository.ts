
import { Notification } from "../../model/notification"; // Your Mongoose model
import { INotification, INotificationDocument,IRoomIdsArray,IStoreNotificationData} from "../entities/INotification";

export class NotificationRepository {
  
    async storeNotification(data: IStoreNotificationData): Promise<INotification | null> {
        try {
            const { roomId, content } = data.message;
            const username = data.username;

            const coursename = data.coursename

            const thumbnail = data.thumbnail
    
            console.log(roomId, username, coursename, thumbnail, content);
    
            const newNotification: Partial<INotification> = {
                roomId,
                coursename,
                thumbnail,
                username,
                message: content,
                isRead: false,
                createdAt: new Date(),
            };
    
            // Create a new notification document
            const notificationDoc = new Notification(newNotification as INotificationDocument);
            const savedNotification = await notificationDoc.save();
    
            return savedNotification.toObject(); // Convert to plain JavaScript object
        } catch (error) {
            console.error("Error storing notification:", error);
            throw new Error(`Error storing notification for senderId ${data.username}: ${error instanceof Error ? error.message : error}`);
        }
    }



  async fetchNotification(data: IRoomIdsArray,limitPerRoom: number = 8): Promise<INotification[]> {
    try {
      console.log(data, "data in fetchNotification");
  

      const roomIds = data.map(item => item.roomId);
  
      const notifications = await Notification.aggregate([
        { $match: { roomId: { $in: roomIds } } },
        { $sort: { createdAt: -1 } },             
        { $group: {                               
            _id: "$roomId",
            messages: { $push: "$$ROOT" }         
        }},
        { $project: {                            
            _id: 1,
            messages: { $slice: ["$messages", limitPerRoom] }
        }}
    ]);

      console.log(notifications)
  
      return notifications.map(notification => notification.toObject()); // Convert to plain objects if needed
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching notifications: ${error.message}`);
      }
      throw error;
    }
  }
  





}
