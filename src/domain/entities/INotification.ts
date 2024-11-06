export interface INotificationDocument extends Document {
    roomId: string;
    coursename:string;
    thumbnail:string;
    username: string;
    chatId: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
  }
  
export interface INotification {
    roomId: string;
    coursename:string;
    thumbnail:string;
    username: string;
    chatId: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}


export interface IRoomId {
    roomId: string; // Represents the roomId property as a string
  }
  
  export type IRoomIdsArray = IRoomId[];



export interface IStoreNotificationData {
    message: {
        roomId: string;
        content: string;
    };
    username: string;
    thumbnail: string;
    coursename: string;
}
