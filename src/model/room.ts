import mongoose, { Schema } from 'mongoose';
import { IRoomDocument } from '../domain/entities/IRoom';

const roomSchema = new Schema<IRoomDocument>({
  roomId: {
    type: String,
    required: true
  },
  participantIds: [{
    type: String,
    required: true
  }],
  lastMessage: {
    type: String,
    default: ''
  },
  lastMessageTime: {
    type: Date,
    default: Date.now
  },
  view: [{
    userId: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
  }],
}, { timestamps: true });

export const Room = mongoose.model<IRoomDocument>('Room', roomSchema);
