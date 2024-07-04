import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_URL, HEADERS } from './config';

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  headers: HEADERS,
  cache: new InMemoryCache(),
});

export default client;
