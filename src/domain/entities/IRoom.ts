import { Document } from 'mongoose';

export interface IRoom {
  roomId: string;               // Unique identifier for the room
  participantIds: string[];     // Array of user IDs participating in the room
  lastMessage: string;          // Last message content for the chat list preview
  lastMessageTime: Date; 
  view: Array<{                 
    userId: string;             
    isRead: boolean;             
  }>;       // Timestamp of the last message
}

export interface IRoomDocument extends IRoom, Document {}



export interface findRoom{
   userId:string;
}


export interface RoomUser{
  roomId:string;
}