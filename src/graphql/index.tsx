import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['ID'];
  last_name: Scalars['String'];
};

export type Achievement = {
  __typename?: 'Achievement';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Brightness = {
  __typename?: 'Brightness';
  brightness: Scalars['Float'];
  id: Scalars['ID'];
  light: Scalars['String'];
};


export type Device = {
  __typename?: 'Device';
  color: Scalars['String'];
  data?: Maybe<Array<DeviceData>>;
  id: Scalars['ID'];
  label: Scalars['String'];
  title: Scalars['String'];
};

export type DeviceAttributes = {
  __typename?: 'DeviceAttributes';
  attributes: Scalars['String'];
  id: Scalars['ID'];
};

export type DeviceData = {
  __typename?: 'DeviceData';
  change: Scalars['Float'];
  color: Scalars['String'];
  maxValue: Scalars['Float'];
  minValue: Scalars['Float'];
  type: Scalars['String'];
  unit: Scalars['String'];
  value: Scalars['Float'];
  values: Array<DeviceDataValue>;
};

export type DeviceDataValue = {
  __typename?: 'DeviceDataValue';
  ts: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type EventFromEmployee = {
  __typename?: 'EventFromEmployee';
  breath: Scalars['Int'];
  date: Scalars['DateTime'];
  how_feel: Scalars['String'];
  id: Scalars['ID'];
  is_unread: Scalars['Boolean'];
  name: Scalars['String'];
  place: Scalars['String'];
  temperature: Scalars['Int'];
  threat: Scalars['Int'];
};

export type EventFromMeasure = {
  __typename?: 'EventFromMeasure';
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  is_unread: Scalars['Boolean'];
  justification: Scalars['String'];
  place: Scalars['String'];
  threat: Scalars['Int'];
  title: Scalars['String'];
};

export type Feedback = {
  __typename?: 'Feedback';
  breath: Scalars['Int'];
  date: Scalars['DateTime'];
  how_feel: Scalars['String'];
  id: Scalars['ID'];
  is_unread: Scalars['Boolean'];
  name: Scalars['String'];
  temperature: Scalars['Int'];
  total_score: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  renameDevice: Device;
  saveDeviceAttributes: DeviceAttributes;
  setBrightness: Brightness;
  updateToken: Scalars['Boolean'];
};


export type MutationRenameDeviceArgs = {
  input: RenameDeviceInput;
};


export type MutationSaveDeviceAttributesArgs = {
  data: Scalars['String'];
  id: Scalars['String'];
};


export type MutationSetBrightnessArgs = {
  input: SetBrightnessInput;
};


export type MutationUpdateTokenArgs = {
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  achievements: Array<Achievement>;
  brightness: Brightness;
  device: Device;
  deviceAttributes: DeviceAttributes;
  device_data: Device;
  devices: Array<Device>;
  devices_data: Array<Device>;
  event_from_employee: EventFromEmployee;
  event_from_measure: EventFromMeasure;
  events_from_employee: Array<EventFromEmployee>;
  events_from_employees_unread_count: Scalars['Int'];
  events_from_measure: Array<EventFromMeasure>;
  events_from_measure_unread_count: Scalars['Int'];
  events_unread_count: Scalars['Int'];
  feedback: Feedback;
  feedback_unread_count: Scalars['Int'];
  feedbacks: Array<Feedback>;
  suggestion: Suggestion;
  suggestions: Array<Suggestion>;
  suggestions_unread_count: Scalars['Int'];
};


export type QueryBrightnessArgs = {
  id: Scalars['String'];
};


export type QueryDeviceArgs = {
  id: Scalars['String'];
};


export type QueryDeviceAttributesArgs = {
  id: Scalars['String'];
};


export type QueryDevice_DataArgs = {
  endTs?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  interval?: Maybe<Scalars['Int']>;
  startTs?: Maybe<Scalars['String']>;
};


export type QueryDevices_DataArgs = {
  endTs?: Maybe<Scalars['String']>;
  interval?: Maybe<Scalars['Int']>;
  startTs?: Maybe<Scalars['String']>;
};


export type QueryEvent_From_EmployeeArgs = {
  id: Scalars['ID'];
};


export type QueryEvent_From_MeasureArgs = {
  id: Scalars['ID'];
};


export type QueryFeedbackArgs = {
  id: Scalars['ID'];
};


export type QuerySuggestionArgs = {
  id: Scalars['ID'];
};

export type RenameDeviceInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type SetBrightnessInput = {
  brightness: Scalars['Float'];
  id: Scalars['ID'];
  light: Scalars['String'];
};

export type Suggestion = {
  __typename?: 'Suggestion';
  date: Scalars['DateTime'];
  description: Scalars['String'];
  how_solve: Scalars['String'];
  id: Scalars['ID'];
  importance: Scalars['Int'];
  is_unread: Scalars['Boolean'];
  title: Scalars['String'];
  why_important: Scalars['String'];
};

export type GetAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountQuery = { __typename?: 'Query', account: { __typename?: 'Account', id: string, first_name: string, last_name: string, email: string } };

export type GetAchievementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAchievementsQuery = { __typename?: 'Query', achievements: Array<{ __typename?: 'Achievement', name: string }> };

export type GetDevicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDevicesQuery = { __typename?: 'Query', devices: Array<{ __typename?: 'Device', id: string, title: string, label: string }> };

export type GetDeviceDataQueryVariables = Exact<{
  id: Scalars['String'];
  startTs?: Maybe<Scalars['String']>;
  endTs?: Maybe<Scalars['String']>;
  interval?: Maybe<Scalars['Int']>;
}>;


export type GetDeviceDataQuery = { __typename?: 'Query', device_data: { __typename?: 'Device', id: string, title: string, label: string, color: string, data?: Maybe<Array<{ __typename?: 'DeviceData', type: string, unit: string, value: number, change: number, color: string, maxValue: number, minValue: number, values: Array<{ __typename?: 'DeviceDataValue', ts: any, value: number }> }>> } };

export type GetDeviceAttributesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetDeviceAttributesQuery = { __typename?: 'Query', deviceAttributes: { __typename?: 'DeviceAttributes', id: string, attributes: string } };

export type GetBrightnessQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetBrightnessQuery = { __typename?: 'Query', brightness: { __typename?: 'Brightness', id: string, brightness: number, light: string } };

export type SetBrightnessMutationVariables = Exact<{
  input: SetBrightnessInput;
}>;


export type SetBrightnessMutation = { __typename?: 'Mutation', setBrightness: { __typename?: 'Brightness', id: string, brightness: number, light: string } };

export type SaveDeviceAttributesMutationVariables = Exact<{
  id: Scalars['String'];
  data: Scalars['String'];
}>;


export type SaveDeviceAttributesMutation = { __typename?: 'Mutation', saveDeviceAttributes: { __typename?: 'DeviceAttributes', id: string, attributes: string } };


export const GetAccountDocument = gql`
    query GetAccount {
  account {
    id
    first_name
    last_name
    email
  }
}
    `;

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
      }
export function useGetAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
        }
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<typeof useGetAccountLazyQuery>;
export type GetAccountQueryResult = Apollo.QueryResult<GetAccountQuery, GetAccountQueryVariables>;
export const GetAchievementsDocument = gql`
    query GetAchievements {
  achievements {
    name
  }
}
    `;

/**
 * __useGetAchievementsQuery__
 *
 * To run a query within a React component, call `useGetAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAchievementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAchievementsQuery(baseOptions?: Apollo.QueryHookOptions<GetAchievementsQuery, GetAchievementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAchievementsQuery, GetAchievementsQueryVariables>(GetAchievementsDocument, options);
      }
export function useGetAchievementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAchievementsQuery, GetAchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAchievementsQuery, GetAchievementsQueryVariables>(GetAchievementsDocument, options);
        }
export type GetAchievementsQueryHookResult = ReturnType<typeof useGetAchievementsQuery>;
export type GetAchievementsLazyQueryHookResult = ReturnType<typeof useGetAchievementsLazyQuery>;
export type GetAchievementsQueryResult = Apollo.QueryResult<GetAchievementsQuery, GetAchievementsQueryVariables>;
export const GetDevicesDocument = gql`
    query GetDevices {
  devices {
    id
    title
    label
  }
}
    `;

/**
 * __useGetDevicesQuery__
 *
 * To run a query within a React component, call `useGetDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDevicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDevicesQuery(baseOptions?: Apollo.QueryHookOptions<GetDevicesQuery, GetDevicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDevicesQuery, GetDevicesQueryVariables>(GetDevicesDocument, options);
      }
export function useGetDevicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDevicesQuery, GetDevicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDevicesQuery, GetDevicesQueryVariables>(GetDevicesDocument, options);
        }
export type GetDevicesQueryHookResult = ReturnType<typeof useGetDevicesQuery>;
export type GetDevicesLazyQueryHookResult = ReturnType<typeof useGetDevicesLazyQuery>;
export type GetDevicesQueryResult = Apollo.QueryResult<GetDevicesQuery, GetDevicesQueryVariables>;
export const GetDeviceDataDocument = gql`
    query GetDeviceData($id: String!, $startTs: String, $endTs: String, $interval: Int) {
  device_data(id: $id, startTs: $startTs, endTs: $endTs, interval: $interval) {
    id
    title
    label
    color
    data {
      type
      unit
      value
      change
      color
      maxValue
      minValue
      values {
        ts
        value
      }
    }
  }
}
    `;

/**
 * __useGetDeviceDataQuery__
 *
 * To run a query within a React component, call `useGetDeviceDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *      startTs: // value for 'startTs'
 *      endTs: // value for 'endTs'
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useGetDeviceDataQuery(baseOptions: Apollo.QueryHookOptions<GetDeviceDataQuery, GetDeviceDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeviceDataQuery, GetDeviceDataQueryVariables>(GetDeviceDataDocument, options);
      }
export function useGetDeviceDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeviceDataQuery, GetDeviceDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeviceDataQuery, GetDeviceDataQueryVariables>(GetDeviceDataDocument, options);
        }
export type GetDeviceDataQueryHookResult = ReturnType<typeof useGetDeviceDataQuery>;
export type GetDeviceDataLazyQueryHookResult = ReturnType<typeof useGetDeviceDataLazyQuery>;
export type GetDeviceDataQueryResult = Apollo.QueryResult<GetDeviceDataQuery, GetDeviceDataQueryVariables>;
export const GetDeviceAttributesDocument = gql`
    query GetDeviceAttributes($id: String!) {
  deviceAttributes(id: $id) {
    id
    attributes
  }
}
    `;

/**
 * __useGetDeviceAttributesQuery__
 *
 * To run a query within a React component, call `useGetDeviceAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceAttributesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDeviceAttributesQuery(baseOptions: Apollo.QueryHookOptions<GetDeviceAttributesQuery, GetDeviceAttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeviceAttributesQuery, GetDeviceAttributesQueryVariables>(GetDeviceAttributesDocument, options);
      }
export function useGetDeviceAttributesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeviceAttributesQuery, GetDeviceAttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeviceAttributesQuery, GetDeviceAttributesQueryVariables>(GetDeviceAttributesDocument, options);
        }
export type GetDeviceAttributesQueryHookResult = ReturnType<typeof useGetDeviceAttributesQuery>;
export type GetDeviceAttributesLazyQueryHookResult = ReturnType<typeof useGetDeviceAttributesLazyQuery>;
export type GetDeviceAttributesQueryResult = Apollo.QueryResult<GetDeviceAttributesQuery, GetDeviceAttributesQueryVariables>;
export const GetBrightnessDocument = gql`
    query GetBrightness($id: String!) {
  brightness(id: $id) {
    id
    brightness
    light
  }
}
    `;

/**
 * __useGetBrightnessQuery__
 *
 * To run a query within a React component, call `useGetBrightnessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrightnessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrightnessQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBrightnessQuery(baseOptions: Apollo.QueryHookOptions<GetBrightnessQuery, GetBrightnessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrightnessQuery, GetBrightnessQueryVariables>(GetBrightnessDocument, options);
      }
export function useGetBrightnessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrightnessQuery, GetBrightnessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrightnessQuery, GetBrightnessQueryVariables>(GetBrightnessDocument, options);
        }
export type GetBrightnessQueryHookResult = ReturnType<typeof useGetBrightnessQuery>;
export type GetBrightnessLazyQueryHookResult = ReturnType<typeof useGetBrightnessLazyQuery>;
export type GetBrightnessQueryResult = Apollo.QueryResult<GetBrightnessQuery, GetBrightnessQueryVariables>;
export const SetBrightnessDocument = gql`
    mutation SetBrightness($input: SetBrightnessInput!) {
  setBrightness(input: $input) {
    id
    brightness
    light
  }
}
    `;
export type SetBrightnessMutationFn = Apollo.MutationFunction<SetBrightnessMutation, SetBrightnessMutationVariables>;

/**
 * __useSetBrightnessMutation__
 *
 * To run a mutation, you first call `useSetBrightnessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetBrightnessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setBrightnessMutation, { data, loading, error }] = useSetBrightnessMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetBrightnessMutation(baseOptions?: Apollo.MutationHookOptions<SetBrightnessMutation, SetBrightnessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetBrightnessMutation, SetBrightnessMutationVariables>(SetBrightnessDocument, options);
      }
export type SetBrightnessMutationHookResult = ReturnType<typeof useSetBrightnessMutation>;
export type SetBrightnessMutationResult = Apollo.MutationResult<SetBrightnessMutation>;
export type SetBrightnessMutationOptions = Apollo.BaseMutationOptions<SetBrightnessMutation, SetBrightnessMutationVariables>;
export const SaveDeviceAttributesDocument = gql`
    mutation SaveDeviceAttributes($id: String!, $data: String!) {
  saveDeviceAttributes(id: $id, data: $data) {
    id
    attributes
  }
}
    `;
export type SaveDeviceAttributesMutationFn = Apollo.MutationFunction<SaveDeviceAttributesMutation, SaveDeviceAttributesMutationVariables>;

/**
 * __useSaveDeviceAttributesMutation__
 *
 * To run a mutation, you first call `useSaveDeviceAttributesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveDeviceAttributesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveDeviceAttributesMutation, { data, loading, error }] = useSaveDeviceAttributesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveDeviceAttributesMutation(baseOptions?: Apollo.MutationHookOptions<SaveDeviceAttributesMutation, SaveDeviceAttributesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveDeviceAttributesMutation, SaveDeviceAttributesMutationVariables>(SaveDeviceAttributesDocument, options);
      }
export type SaveDeviceAttributesMutationHookResult = ReturnType<typeof useSaveDeviceAttributesMutation>;
export type SaveDeviceAttributesMutationResult = Apollo.MutationResult<SaveDeviceAttributesMutation>;
export type SaveDeviceAttributesMutationOptions = Apollo.BaseMutationOptions<SaveDeviceAttributesMutation, SaveDeviceAttributesMutationVariables>;