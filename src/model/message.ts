import mongoose, { Schema } from 'mongoose';
import { IMessageDocument } from '../domain/entities/IMessage';

const messageSchema = new Schema<IMessageDocument>({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  video: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Message = mongoose.model<IMessageDocument>('Message', messageSchema);
