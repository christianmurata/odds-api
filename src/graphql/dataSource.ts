import { HTTPCache, RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

interface Event {
  id: Number;
  odds: [Object];
}

interface Competition {
  name: string;
  key: string;
  sport: [Object];
  events: [Event];
  category: [Object];
}

interface FixturesResponse {
  competitions: [Competition];
}

export class OddsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://sports-api.cloudbet.com/pub/v2/odds/';
    this.httpCache = new HTTPCache();
  }

  protected willSendRequest(request: RequestOptions): void | Promise<void> {
    request.headers.set('X-API-Key', process.env.API_KEY || '')
  }

  async getSports() {
    return await this.get('sports').then(sports => sports.sports);
  }

  async getEventById(eventId: Number) {
    return await this.get(`events/${eventId}`);
  }

  async getFixturesByDateAndSport(date: string, sport: string = 'soccer', limit: number = 100) {
    return await this
      .get('fixtures', { date, sport, limit })
      .then(async (fixtures: FixturesResponse) => fixtures.competitions);
  }
}

export const dataSources = () => ({ OddsAPI: new OddsAPI() });