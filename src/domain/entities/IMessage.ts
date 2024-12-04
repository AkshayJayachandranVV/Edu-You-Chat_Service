import { Document, Types } from 'mongoose';

export interface IMessage {
  roomId: Types.ObjectId;        
  userId: string;         
  content?: string;              
  image?: string;                
  video?: string;                
  isRead?: string;         
  createdAt: Date;               
  view: Array<{                 
    userId: string;             
    isRead: boolean;             
  }>;
}

export interface updateRead {
  messageIds: string[];        
  userId: string;
}

export interface Course {
  _id: Types.ObjectId; 
  courseName: string;
  courseDescription: string;
  thumbnail?: string; // Optional fields
}

export interface CourseWithLastMessage extends Course {
  lastMessage: string;
  lastMessageTime: Date | null;
}


export interface MessageUser { 
  roomId: string;
   senderId: string;
    content: string
  }

export interface StoreFile {
   roomId: string; 
   senderId: string;
    s3Key: string;
     mediaType: string
     }
  

export interface IMessageDocument extends IMessage, Document {}
