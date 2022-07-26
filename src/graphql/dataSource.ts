import { HTTPCache, RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { dateToStr } from '../helpers/date';

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

interface SportsResponse {
  sports: [Object];
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
    return await this.get('sports').then((sports: SportsResponse) => sports.sports);
  }

  async getFixturesByDateAndSport(date: Date, sport: string, limit: number = 100) { 
    return await this
      .get('fixtures', { date: dateToStr(date), sport, limit })
      .then(async (fixtures: FixturesResponse) => fixtures.competitions);
  }

  async getOddsByEventIdAndMarketUrl(eventId: Number, marketUrl: string){
    return await this.post('lines', { eventId: eventId.toString(), marketUrl });
  }
}

export const dataSources = () => ({ OddsAPI: new OddsAPI() });