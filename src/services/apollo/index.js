import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

let client;

const HttpLink = createHttpLink({
  uri: `http://localhost:4000/graphql`,
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export function getClient() {
  if (!client) {
    client = new ApolloClient({
      link: HttpLink,
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions,
    });
  }

  return client;
}
