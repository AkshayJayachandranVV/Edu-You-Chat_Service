import { Document,Types } from 'mongoose';

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


export interface streamFetch {
  tutorId:string,
  courseId:string,
}



export interface findRoom{
   userId:string;
}


export interface RoomUser{
  roomId:string;
}

export interface RoomData {
  roomId: Types.ObjectId;
  lastMessage: string;
  lastMessageTime: Date | null;
}


export interface UserCourse {
   userId:string; 
  courseId:string;
  tutorId:string
}


export interface fetchChat { 
  roomId: string; 
  userId: string 
}