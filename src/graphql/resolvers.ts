import { Resolvers } from "../../graphql/generated";

export const resolvers: Resolvers = {
  Query: {
    sports: (_, { }, { dataSources}) => {
      return dataSources.OddsAPI.getSports();
    },

    fixturesByDateAndSport: (_, { date, sport },  { dataSources }) => {
      return dataSources.OddsAPI.getFixturesByDateAndSport(new Date(date), sport);
    },

    oddsByEventIdAndMarketUrl: (_, { eventId, marketUrl }, { dataSources }) => {
      return dataSources.OddsAPI.getOddsByEventIdAndMarketUrl(eventId, marketUrl);
    }
  }
}