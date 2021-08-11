import { createReactClient } from "@gqless/react";
import { createClient, QueryFetcher } from "gqless";

import { LUFTIO_GRAPHQL_ENDPOINT } from "@env";

import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";

import ThingsboardService from "../services/ThingsboardService";

const currentlyFetching: string[] = [];

const serverQueryFetcher: QueryFetcher = async function (query: string, variables: Record<string, any> | undefined) {
  const requestBody = JSON.stringify({
    query,
    variables,
  });
  if (currentlyFetching.includes(requestBody)) return { data: null };
  const id = currentlyFetching.push(requestBody);

  const response = await fetch(LUFTIO_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await ThingsboardService.getInstance().getAuthHeader()),
    },
    body: requestBody,
    mode: "cors",
  });

  const json = await response.json();

  currentlyFetching.splice(id);
  return json;
};

const queryFetcher: QueryFetcher = function (query: string, variables: Record<string, any> | undefined) {
  return serverQueryFetcher(query, variables);
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
