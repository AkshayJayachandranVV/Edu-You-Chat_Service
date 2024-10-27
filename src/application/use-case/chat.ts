import { ChatRepository } from "../../domain/repositories/ChatRepository";
import { IRoom } from '../../domain/entities/IRoom';

export class ChatService {
    private chatRepo: ChatRepository;

    constructor() {
        this.chatRepo = new ChatRepository();
    }

    async createRoom(data: any): Promise<IRoom | null> {  // Change return type to IChat or null
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


    async saveMessage(data: any){  // Change return type to IChat or null
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


    async fetchChat(data: any){  // Change return type to IChat or null
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


    async storeFile(data: any){  // Change return type to IChat or null
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
}


