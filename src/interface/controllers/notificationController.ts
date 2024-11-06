import {NotificationService} from "../../application/use-case/notification"
import { IRoomIdsArray } from "../../domain/entities/INotification";

class NotificationController {
    private notificationService: NotificationService

    constructor() {
        this.notificationService = new NotificationService()
    }


   
    async storeNotification(data :any ){
        try {
            console.log(data, "resend otp");
            const result = await this.notificationService.storeNotification(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }

   
    async fetchNotification(data :IRoomIdsArray  ){
        try {
            console.log(data, "fetch notify");
            const result = await this.notificationService.fetchNotification(data)

            console.log(result, "of the resendOtp")
            return result
        } catch (error) {
            console.log("error in resend otp in usercontroller", error);
        }
    }
    
    


}

export const notificationController = new NotificationController()


