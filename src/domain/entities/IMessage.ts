import { Document, Types } from 'mongoose';

export interface IMessage {
  roomId: Types.ObjectId;     // Reference to the Room ID
  userId: string;             // ID of the user who sent the message
  content?: string;           // Optional message content, can be text
  image?: string;             // Optional URL or path for an image
  video?: string;             // Optional URL or path for a video
  createdAt: Date;            // Timestamp of when the message was sent
}

export interface IMessageDocument extends IMessage, Document {}
