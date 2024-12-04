import { ChatRepository } from "../../domain/repositories/ChatRepository";
import { IRoom,findRoom,RoomUser,streamFetch,UserCourse,fetchChat} from '../../domain/entities/IRoom';
import {MessageUser,Course,StoreFile,updateRead} from '../../domain/entities/IMessage';

export class ChatService {
    private chatRepo: ChatRepository;

    constructor() {
        this.chatRepo = new ChatRepository();
    }

    async createRoom(data: UserCourse): Promise<IRoom | null> {  // Change return type to IChat or null
        try {
            console.log(data, "data in createRoom");

            const { userId, courseId,tutorId } = data;

            const createRoom = await this.chatRepo.createRoom(courseId, userId, tutorId);
            return createRoom;  // Return single IChat object

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }


    async saveMessage(data: MessageUser){  // Change return type to IChat or null
        try {
            console.log(data, "data in createRoom");


            const createRoom = await this.chatRepo.saveMessage(data);
            return createRoom;  // Return single IChat object

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }


    async fetchChat(data: fetchChat){  // Change return type to IChat or null
        try {
            console.log(data, "data in createRoom");


            const createRoom = await this.chatRepo.fetchChat(data);
            return createRoom;  // Return single IChat object

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }


    async storeFile(data: StoreFile){  // Change return type to IChat or null
        try {
            console.log(data, "data in createRoom");


            const createRoom = await this.chatRepo.storeFile(data);
            return createRoom;  // Return single IChat object

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }


    
    async fetchLastMessage(data: Course[]){  // Change return type to IChat or null
        try {
            console.log(data, "data in createRoom");


            const lastMessage = await this.chatRepo.fetchLastMessage(data);
            return lastMessage;  // Return single IChat object

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }


    async updateReadMessage(data: updateRead){  // Change return type to IChat or null
        try {
            console.log(data, "data in createRoom");


            const lastMessage = await this.chatRepo.updateReadMessage(data);
            return lastMessage;  // Return single IChat object

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }

    




    async updateReadUsers(data: findRoom){  // Change return type to IChat or null
        try {
            console.log(data, "lalalallalalalallalalal");

           const {userId} =data
            const lastMessage = await this.chatRepo.updateReadUsers(userId);
            return lastMessage;  

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }



    async fetchGroupMembers(data:RoomUser){  // Change return type to IChat or null
        try {
            console.log(data, "lalalallalalalallalalal");

           const {roomId} =data
            const lastMessage = await this.chatRepo.fetchGroupMembers(roomId);
            return lastMessage;  

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }



    async fetchStreamUsers(data:streamFetch){  // Change return type to IChat or null
        try {
            console.log(data, "lalalallalalalallalalal");

           const {courseId,tutorId} =data
            const lastMessage = await this.chatRepo.fetchStreamUsers(courseId,tutorId);
            return lastMessage;  

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating room: ${error.message}`);
            }
            throw error;
        }
    }


}



