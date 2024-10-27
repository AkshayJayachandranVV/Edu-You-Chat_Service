import {ChatService} from "../../application/use-case/chat";
// import {ITutor, registerData , tempId , LoginTutor, Email} from "../../domain/entities/";

class ChatController {
    private chatService: ChatService

    constructor() {
        this.chatService = new ChatService()
    }

    async createRoom(data :any ){
        try {
            console.log(data, "resend otp");
            const result = await this.chatService.createRoom(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }


    async saveMessage(data :any ){
        try {
            console.log(data, "resend otp");
            const result = await this.chatService.saveMessage(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }


    async fetchChat(data :any ){
        try {
            console.log(data, "resend otp");
            const result = await this.chatService.fetchChat(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }


    async storeFile(data :any ){
        try {
            console.log(data, "storefile -------------");
            const result = await this.chatService.storeFile(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }


}

export const chatController = new ChatController()  






