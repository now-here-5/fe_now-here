import { getEventDetail, getEventEndsAt } from '@/infrastructure/http/api/eventApi'

export class EventRepository {
  async getEventDetail() {
    return await getEventDetail();
  }
  async getEventEndsAt() {
    return await getEventEndsAt()
  }
}
