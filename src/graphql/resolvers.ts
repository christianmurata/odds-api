import { Resolvers } from "../../graphql/generated";

export const resolvers: Resolvers = {
  Query: {
    sports: (_, { }, { dataSources}) => {
      return dataSources.OddsAPI.getSports();
    }
  }
}