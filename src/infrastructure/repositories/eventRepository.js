import { getEventEndsAt } from '../http/api/eventApi'

export class EventRepository {
  async getEventEndsAt() {
    return await getEventEndsAt()
  }
}
