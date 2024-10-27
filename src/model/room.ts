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
  }
}, { timestamps: true });

export const Room = mongoose.model<IRoomDocument>('Room', roomSchema);
