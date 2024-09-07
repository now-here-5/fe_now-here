import {getNotification, patchNotification} from "@/infrastructure/http/api/notification.js";

export class NotificationRepository {
	async patchNotification(notification) {
		const response = await patchNotification(notification)
		return response
	}
	
	async getNotification () {
		return await getNotification();
	}
}