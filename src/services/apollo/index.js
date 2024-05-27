import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

let client;

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const HttpLink = createHttpLink({
  uri: `${apiBaseUrl}/graphql`,
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
