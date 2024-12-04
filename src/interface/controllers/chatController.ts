import { AnyBulkWriteOperation } from "mongoose";
import {ChatService} from "../../application/use-case/chat";
import {updateRead,MessageUser,StoreFile,Course} from "../../domain/entities/IMessage";
import {findRoom,RoomUser,streamFetch,UserCourse,fetchChat} from "../../domain/entities/IRoom";

class ChatController { 
    private chatService: ChatService

    constructor() {
        this.chatService = new ChatService()
    }

    async createRoom(data :UserCourse ){
        try {
            console.log(data, "resend otp");
            const result = await this.chatService.createRoom(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }


    async saveMessage(data :MessageUser ){
        try {
            console.log(data, "resend otp");
            const result = await this.chatService.saveMessage(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }


    async fetchChat(data :fetchChat ){
        try {
            console.log(data, "resend otp");
            const result = await this.chatService.fetchChat(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }


    async storeFile(data :StoreFile ){
        try {
            console.log(data, "storefile -------------");
            const result = await this.chatService.storeFile(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }
    

    async fetchLastMessage(data :Course[] ){
        try {
            console.log(data, "storefile -------------");
            const result = await this.chatService.fetchLastMessage(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }


    async updateReadMessage(data :updateRead ){
        try {
            console.log(data, "update read -------------");
            const result = await this.chatService.updateReadMessage(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }



    async updateReadUsers(data :findRoom ){
        try {
            console.log(data, "lalalallalalalallalalal -------------");
            const result = await this.chatService.updateReadUsers(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }



    async fetchGroupMembers(data :RoomUser ){
        try {
            console.log(data, "lalalallalalalallalalal -------------");
            const result = await this.chatService.fetchGroupMembers(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }


    async fetchStreamUsers(data : streamFetch ){
        try {
            console.log(data, "lalalallalalalallalalal -------------");
            const result = await this.chatService.fetchStreamUsers(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }

}

export const chatController = new ChatController()  






