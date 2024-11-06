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


export interface IMessageDocument extends IMessage, Document {}
