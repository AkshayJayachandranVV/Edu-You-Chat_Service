import { Room } from "../../model/room";
import { Types } from 'mongoose';
import { Message } from "../../model/message";
import { IRoomDocument,IRoom } from '../entities/IRoom';
import { IMessageDocument,updateRead } from '../entities/IMessage';

export class ChatRepository {

    async createRoom(courseId: string, userId: string, tutorId: string): Promise<IRoom | null> {
        try {
            console.log({ courseId, userId, tutorId }, 'data in createRoom');
    
            // Check if a room exists for the given courseId
            let room = await Room.findOne({ roomId: courseId }) as IRoomDocument | null;
    
            // If no room exists for the courseId, create a new one
            if (!room) {
                room = await Room.create({
                    roomId: courseId,
                    participantIds: [tutorId, userId],
                    lastMessage: '',
                    lastMessageTime: new Date(),
                    // Initialize view array with both participants' read status
                    view: [
                        {
                            userId: userId,
                            isRead: false
                        },
                        {
                            userId: tutorId,
                            isRead: false
                        }
                    ]
                }) as IRoomDocument;
            } else {
                // If the room exists, check if the user is already a participant
                if (!room.participantIds.includes(userId)) {
                    room.participantIds.push(userId);
                    // Add the new user's view status
                    room.view.push({
                        userId: userId,
                        isRead: false
                    });
                    await room.save();
                }
            }
    
            // Construct the IRoom object to return
            const chatRoom: IRoom = {
                roomId: room.roomId,
                participantIds: room.participantIds,
                lastMessage: room.lastMessage,
                lastMessageTime: room.lastMessageTime,
                view: room.view  // Include view array in the response
            };
    
            console.log(chatRoom, 'data in response');
            return chatRoom;
        } catch (error) {
            throw new Error(`Error creating or updating room:`);
        }
    }
    
    


    // async saveMessage(data: { roomId: string, senderId: string, content: string }) {
    //     try {
    //         console.log('Data in saveMessage:', data);  // Log input to check if correct data is passed
    //         const { roomId, senderId, content } = data;
    
    //         // Find the room by roomId
    //         const room = await Room.findOne({ roomId });
    
    //         if (!room) {
    //             throw new Error(`Room with ID ${roomId} not found`);
    //         }
    
    //         // Create a new message document in the Message collection
    //         const newMessage = await Message.create({
    //             roomId: room._id,  // Reference the room's ObjectId
    //             userId: senderId,
    //             content,
    //             createdAt: new Date()
    //         });
    
    //         // Update the room's lastMessage and lastMessageTime
    //         room.lastMessage = content;
    //         room.lastMessageTime = newMessage.createdAt;
    //         await room.save();
    
    //         console.log('Message saved successfully');
    //         return newMessage;
    //     } catch (error) {
    //         console.error('Error saving message:', error);
    //         throw new Error('Error saving message');
    //     }
    // }


    async saveMessage(data: { roomId: string, senderId: string, content: string }) {
        try {
            console.log('Data in saveMessage:', data);  // Log input to check if correct data is passed
            const { roomId, senderId, content } = data;
    
            // Find the room by roomId
            const room = await Room.findOne({ roomId });
            if (!room) {
                throw new Error(`Room with ID ${roomId} not found`);
            }
    
            // Check the current view array for read status
            const readCount = room.view.filter(participant => participant.isRead).length;
            const isRead = readCount >= 2;
    
            // Create a new message document with isRead:false for all participants
            const view = room.participantIds.map(userId => ({
                userId,
                isRead: false
            }));
            
            const newMessage = await Message.create({
                roomId: room._id,         // Reference the room's ObjectId
                userId: senderId,
                content,
                view,                     // Add the view array here
                createdAt: new Date()
            });
    
            // Update the room's lastMessage and lastMessageTime
            room.lastMessage = content;
            room.lastMessageTime = newMessage.createdAt;
            await room.save();
    
            console.log('Message saved successfully');
            return { ...newMessage.toObject(), isRead };  // Return message with isRead field
        } catch (error) {
            console.error('Error saving message:', error);
            throw new Error('Error saving message');
        }
    }
    
    



    async fetchChat(data: { roomId: string; userId: string }) {
        try {
            console.log('Data received to fetch chat:', data);
            const { roomId, userId } = data;
    
            // Find the room by roomId and ensure the user is a participant
            const room: IRoomDocument | null = await Room.findOne({
                roomId,
                participantIds: userId
            });
    
            console.log('Room found:', room);
    
            if (!room) {
                throw new Error('Room not found or user is not a participant');
            }
    
            // First, update all messages' read status for this user in this room
            await Message.updateMany(
                { 
                    roomId: room._id,
                    'view.userId': userId 
                },
                { 
                    $set: { 'view.$.isRead': true } 
                }
            );
    
            // Also update the room's view array for this user
            await Room.updateOne(
                { 
                    _id: room._id,
                    'view.userId': userId 
                },
                { 
                    $set: { 'view.$.isRead': true } 
                }
            );
    
            // Fetch all messages that belong to the specified roomId
            const messages = await Message.find({ roomId: room._id })
                .sort({ createdAt: 1 })
                .exec();
    
            // Transform the messages to include only the 'isRead' status for the specified userId
            const formattedMessages = messages.map((message) => {
                // Since we just updated all messages to read, we know isRead is true for this user
                const userView = message.view.find(view => view.userId === userId);
                return {
                    _id: message._id,
                    roomId: message.roomId,
                    userId: message.userId,
                    content: message.content,
                    image: message.image,
                    video: message.video,
                    createdAt: message.createdAt,
                    isRead: userView ? userView.isRead : false
                };
            });
    
            console.log('Formatted messages:', formattedMessages);
    
            return {
                success: true,
                messages: formattedMessages,
            };
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw new Error('Error fetching messages');
        }
    }
    
    
    


    // async fetchChat(data: { roomId: string; userId: string }) {
    //     try {
    //         console.log('Data received to fetch chat:', data);  // Log input to verify correctness
    //         const { roomId, userId } = data;
    
    //         // Find the room by roomId (courseId) and ensure the user is a participant
    //         const room: IRoomDocument | null = await Room.findOne({
    //             roomId,
    //             participantIds: userId  // Ensure that the user is part of the room
    //         });
    
    //         console.log('Room found:', room); // Log the room object
    
    //         if (!room) {
    //             throw new Error('Room not found or user is not a participant');
    //         }
    
    //         // Fetch all messages that belong to the specified roomId
    //         const messages = await Message.find({ roomId: room._id }).sort({ createdAt: 1 }).exec();
    
    //         console.log('Fetched messages:', messages);
    
    //         return {
    //             success: true,
    //             messages: messages,
    //         };
    //     } catch (error) {
    //         console.error('Error fetching messages:', error); // Log the actual error
    //         throw new Error('Error fetching messages');
    //     }
    // }
    



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



    async fetchLastMessage(data: any) {
        try {
            console.log('Data received to fetch chat:', data); 

            const coursesWithLastMessages = await Promise.all(
                data.map(async (course:any) => {
                  const room = await Room.findOne({ roomId: course._doc._id })
                    .sort({ lastMessageTime: -1 }) 
                    .select('lastMessage lastMessageTime') 
                    .lean();

                  return {
                    ...course,
                    lastMessage: room?.lastMessage || '', // Default to empty if no last message
                    lastMessageTime: room?.lastMessageTime || null, // Default to null if no last message time
                  };
                })
              );
            
              return coursesWithLastMessages;
            
        } catch (error) {
            console.error('Error fetching messages:', error); // Log the actual error
            throw new Error('Error fetching messages');
        }
    }



    async updateReadMessage(data: updateRead) {
        try {
            console.log('Data received to update message read status:', data);
    
            const { messageIds, userId } = data;
    
            // Loop through each messageId and update the isRead status for the corresponding userId
            const updatePromises = messageIds.map(async (messageId) => {
                return await Message.updateOne(
                    { _id: messageId, "view.userId": userId },  // Find message with the given messageId and userId in view array
                    { $set: { "view.$.isRead": true } }          // Update isRead to true for that specific userId
                );
            });
    
            // Execute all updates and wait for them to complete
            const results = await Promise.all(updatePromises);
            
            console.log(results, "Message read status updated successfully");
    
            return results; // Return the results of all updates
        } catch (error) {
            console.error('Error updating message read status:', error);
            throw new Error('Error updating message read status');
        }
    }
    



    async updateReadStatus(data:any ) {
        try {
            console.log('Data received to update message read status:', data);
    
            
        } catch (error) {
            console.error('Error updating message read status:', error);
            throw new Error('Error updating message read status');
        }
    }
    


    async  updateReadUsers(userId: string) {
        try {
            console.log('lalalallalalalallalalal', userId);
    
            // Find all rooms where the user is a participant
            const rooms = await Room.find({ participantIds: userId });
    
            // Update each room to set `isRead` to false for the specified userId
            for (let room of rooms) {
                room.view = room.view.map(viewEntry => {
                    if (viewEntry.userId === userId) {
                        return {
                            ...viewEntry,
                            isRead: false  // Update isRead to false
                        };
                    }
                    return viewEntry;
                });
    
                await room.save();
            }
    
            console.log(`Read status updated to false for user ${userId} in relevant rooms.`);
        } catch (error) {
            console.error('Error updating message read status:', error);
            throw new Error('Error updating message read status');
        }
    }




    async fetchGroupMembers(roomId: string) {
        try {
            console.log('Fetching participants for room:', roomId);
    
            // Find the room by roomId and retrieve only the participantIds field
            const room = await Room.findOne({ roomId }, { participantIds: 1 });
    
            if (!room) {
                throw new Error('Room not found');
            }
    
            // Map participantIds array to the desired format
            const participants = room.participantIds.map((id: string) => ({ userId: id }));
    
            console.log('Participants:', participants);
            return participants;
        } catch (error) {
            console.error('Error fetching group members:', error);
            throw new Error('Error fetching group members');
        }
    }

}









