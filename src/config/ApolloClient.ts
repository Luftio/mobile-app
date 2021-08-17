import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

//@ts-ignore
import { LUFTIO_GRAPHQL_ENDPOINT } from "@env";
import ThingsboardService from "../services/ThingsboardService";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) console.log(networkError);
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error(err);
      if (err?.extensions?.code === "invalid-jwt") {
        console.error("Invalid JWT");
        ThingsboardService.getInstance().logout();
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
