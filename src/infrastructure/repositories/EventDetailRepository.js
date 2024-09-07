import { getEventDetail } from '../http/api/eventDetail.js';

export class EventDetailRepository {
  async getEventDetail() {
    return await getEventDetail();
  }
}