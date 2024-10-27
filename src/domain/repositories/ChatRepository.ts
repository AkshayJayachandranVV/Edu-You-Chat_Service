import { Room } from "../../model/room";
import { Types } from 'mongoose';
import { Message } from "../../model/message";
import { IRoomDocument,IRoom } from '../entities/IRoom';
import { IMessageDocument,IMessage } from '../entities/IMessage';

export class ChatRepository {

async createRoom(courseId: string, userId: string, tutorId: string): Promise<IRoom | null> {
    try {
        console.log({ courseId, userId, tutorId }, 'data in createRoom');  // Log input to check if correct data is passed

        // Check if a room exists for the given courseId
        let room = await Room.findOne({ roomId: courseId }) as IRoomDocument | null;

        // If no room exists for the courseId, create a new one
        if (!room) {
            room = await Room.create({
                roomId: courseId,         // Set roomId to courseId as required
                participantIds: [tutorId, userId],  // Add tutorId and userId as initial participants
                lastMessage: '',
                lastMessageTime: new Date()
            }) as IRoomDocument;
        } else {
            // If the room exists, check if the user is already a participant
            if (!room.participantIds.includes(userId)) {
                room.participantIds.push(userId);  // Add user to the participant list
                await room.save();  // Save the updated room
            }
        }

        // Construct the IRoom object to return
        const chatRoom: IRoom = {
            roomId: room.roomId,              // roomId assigned to courseId
            participantIds: room.participantIds,
            lastMessage: room.lastMessage,
            lastMessageTime: room.lastMessageTime
        };

        console.log(chatRoom, 'data in response');
        return chatRoom;  // Return the newly created or updated chat room
    } catch (error) {
        throw new Error(`Error creating or updating room:`);
    }
}

    
    


    async saveMessage(data: { roomId: string, senderId: string, content: string }) {
        try {
            console.log('Data in saveMessage:', data);  // Log input to check if correct data is passed
            const { roomId, senderId, content } = data;
    
            // Find the room by roomId
            const room = await Room.findOne({ roomId });
    
            if (!room) {
                throw new Error(`Room with ID ${roomId} not found`);
            }
    
            // Create a new message document in the Message collection
            const newMessage = await Message.create({
                roomId: room._id,  // Reference the room's ObjectId
                userId: senderId,
                content,
                createdAt: new Date()
            });
    
            // Update the room's lastMessage and lastMessageTime
            room.lastMessage = content;
            room.lastMessageTime = newMessage.createdAt;
            await room.save();
    
            console.log('Message saved successfully');
            return newMessage;
        } catch (error) {
            console.error('Error saving message:', error);
            throw new Error('Error saving message');
        }
    }
    



    async fetchChat(data: { roomId: string; userId: string }) {
        try {
            console.log('Data received to fetch chat:', data);  // Log input to verify correctness
            const { roomId, userId } = data;
    
            // Find the room by roomId (courseId) and ensure the user is a participant
            const room: IRoomDocument | null = await Room.findOne({
                roomId,
                participantIds: userId  // Ensure that the user is part of the room
            });
    
            console.log('Room found:', room); // Log the room object
    
            if (!room) {
                throw new Error('Room not found or user is not a participant');
            }
    
            // Fetch all messages that belong to the specified roomId
            const messages = await Message.find({ roomId: room._id }).sort({ createdAt: 1 }).exec(); // Sort by createdAt ascending
    
            console.log('Fetched messages:', messages);
    
            return {
                success: true,
                messages: messages,
            };
        } catch (error) {
            console.error('Error fetching messages:', error); // Log the actual error
            throw new Error('Error fetching messages');
        }
    }
    



    async storeFile(data: { roomId: string; senderId: string; s3Key: string; mediaType: string }) {
        try {
            console.log('Data in save message:', data);  // Log input for verification
            const { roomId, senderId, s3Key, mediaType } = data;
    
            // Find the room by roomId
            const room = await Room.findOne({ roomId });
            if (!room) {
                throw new Error(`Room with ID ${roomId} not found`);
            }
    
            // Ensure room._id is an ObjectId by casting it
            const roomObjectId = room._id as Types.ObjectId;
    
            // Create a new message object based on mediaType
            const newMessageData: Partial<IMessageDocument> = {
                roomId: roomObjectId,   // Assign roomId as ObjectId
                userId: senderId,
                createdAt: new Date(),
            };
    
            if (mediaType === "image") {
                newMessageData.image = s3Key;  // Store the S3 key for the image
            } else if (mediaType === "video") {
                newMessageData.video = s3Key;  // Store the S3 key for the video
            } else {
                newMessageData.content = s3Key;  // Fallback for plain text content
            }
    
            // Save the new message document in the Message collection
            const newMessage = await Message.create(newMessageData);
    
            // Update the lastMessage and lastMessageTime in the Room document
            room.lastMessage = s3Key;  // Display the media link or content
            room.lastMessageTime = new Date();
            await room.save();
    
            console.log('Message saved successfully');
            return newMessage;  // Return the saved message document
        } catch (error) {
            console.error('Error saving message:', error);
            throw new Error('Error saving message');
        }
    }
    

}









