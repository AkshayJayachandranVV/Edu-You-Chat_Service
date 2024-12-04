export interface INotificationDocument extends Document {
    roomId: string;
    userId:string;
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
    userId:string;
    chatId: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}

export interface IMessage {
  roomId: string;
  content: string;
  senderId: string; // Ensure senderId is included here
}

export interface IRoomId {
    roomId: string; // Represents the roomId property as a string
  }
  
  export interface IRoomIdsArray {
    senderId: string;
    rooms: IRoomId[];
  }



export interface IStoreNotificationData {
    message: {
        roomId: string;
        content: string;
    };
    senderId:string;
    username: string;
    thumbnail: string;
    coursename: string;
}


export interface IRoomIdsArray extends Array<IRoomId> {}
