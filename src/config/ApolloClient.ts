import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import ThingsboardService from "../services/ThingsboardService";
import { GlobalLogout } from "../utils/GlobalLogout";

const LUFTIO_GRAPHQL_ENDPOINT = "https://app.luftio.com/backend/graphql";
//const LUFTIO_GRAPHQL_ENDPOINT = "http://localhost:3000/graphql";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.log(LUFTIO_GRAPHQL_ENDPOINT);
    console.log(networkError);
  }
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.log(err);
      if (err?.extensions?.code === "invalid-jwt") {
        console.log("Invalid JWT");
        ThingsboardService.getInstance().logout();
        GlobalLogout.dispatch();
      }
    }
  }
});

const authLink = setContext(async (_, { headers }) => {
  const authHeaders = await ThingsboardService.getInstance().getAuthHeader();
  return {
    headers: {
      ...headers,
      ...authHeaders,
    },
  };
});

export const client = new ApolloClient({
  link: from([
    errorLink,
    authLink,
    new HttpLink({
      uri: LUFTIO_GRAPHQL_ENDPOINT,
    }),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
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
