import { createReactClient } from "@gqless/react";
import { mockServer, MockList } from "@graphql-tools/mock";

//@ts-ignore
import { createClient, QueryFetcher } from "gqless";

import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";

//@ts-ignore
import schema from "../graphql/schema.graphql";

const mocks = {
  RootQuery: () => ({
    substancesCard: () => new MockList([4, 4]),
    badgesFromGoodAir: () => new MockList([3, 3]),
    badgesFromFeedback: () => new MockList([2, 2]),
    badgesSpecial: () => new MockList([2, 2]),
    notificationsToday: () => new MockList([1, 10]),
    notificationsYesterday: () => new MockList([1, 10]),
    educationCO2: () => new MockList([4, 4]),
    educationTemperature: () => new MockList([4, 4]),
    educationHumidity: () => new MockList([4, 4]),
    educationPressure: () => new MockList([4, 4]),
    manageDevices: () => new MockList([3, 3]),
  }),
};

const queryFetcher: QueryFetcher = async function (query: string, variables: Record<string, any> | undefined) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockServer(schema, mocks).query(query, variables));
    }, 500);
  });
  // Modify "./src/graphql/schema.graphql" if needed
  /*const response = await fetch("./src/graphql/schema.graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: "cors",
  });

  const json = await response.json();

  return json;*/
};

export const client = createClient<GeneratedSchema, SchemaObjectTypesNames, SchemaObjectTypes>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
});

export const { query, mutation, mutate, subscription, resolved, refetch } = client;

export const {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
} = createReactClient<GeneratedSchema>(client, {
  defaults: {
    // Set this flag as "true" if your usage involves React Suspense
    // Keep in mind that you can overwrite it in a per-hook basis
    suspense: false,

    // Set this flag based on your needs
    staleWhileRevalidate: false,
  },
});

export * from "./schema.generated";
