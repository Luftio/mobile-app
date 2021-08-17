import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import { LUFTIO_GRAPHQL_ENDPOINT } from "@env";
import ThingsboardService from "../services/ThingsboardService";

const errorLink = onError(({ graphQLErrors }) => {
  if (!graphQLErrors) return;
  for (const err of graphQLErrors) {
    console.log(err);
    if (err?.extensions?.code === "invalid-jwt") {
      console.error("Invalid JWT");
      ThingsboardService.getInstance().logout();
    }
  }
});

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...(await ThingsboardService.getInstance().getAuthHeader()),
    },
  };
});

export const client = new ApolloClient({
  link: from([
    authLink,
    errorLink,
    new HttpLink({
      uri: LUFTIO_GRAPHQL_ENDPOINT,
    }),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
