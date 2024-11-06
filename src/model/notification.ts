import mongoose, { Schema, Document } from 'mongoose';
import { INotificationDocument } from '../domain/entities/INotification';


const notificationSchema = new Schema<INotificationDocument>(
    {
      roomId: {
        type: String,
        required: true
      },
      coursename: {
        type: String,
        required: true
      },
      thumbnail: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      isRead: {
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  );
  
  export const Notification = mongoose.model<INotificationDocument>('Notification', notificationSchema);