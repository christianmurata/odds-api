import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

import { dataSources } from './graphql/dataSource';
import { resolvers } from './graphql/resolvers';

dotenv.config();

const typeDefs = readFileSync(__dirname + '/graphql/schema.graphql', {
  encoding: 'utf8'
});

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
});