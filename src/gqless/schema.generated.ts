/**
 * GQLESS AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export const scalarsEnumsHash: import("gqless").ScalarsEnumsHash = {
  ID: true,
  String: true,
  Int: true,
  Float: true,
  Boolean: true,
};
export const generatedSchema = {
  query: {
    __typename: { __type: "String!" },
    device: { __type: "Device", __args: { id: "ID" } },
    brithness: { __type: "Brithness" },
    score: { __type: "Score" },
    substancesCard: { __type: "[DeviceData!]", __args: { id: "ID" } },
    badgesFromGoodAir: { __type: "[Badge!]", __args: { id: "ID" } },
    badgesFromFeedback: { __type: "[Badge!]", __args: { id: "ID" } },
    badgesSpecial: { __type: "[Badge!]", __args: { id: "ID" } },
    notificationsToday: { __type: "[Notification!]", __args: { id: "ID" } },
    notificationsYesterday: { __type: "[Notification!]", __args: { id: "ID" } },
    educationCO2: { __type: "[CollabsibleCard!]", __args: { id: "ID" } },
    educationTemperature: { __type: "[CollabsibleCard!]", __args: { id: "ID" } },
    educationHumidity: { __type: "[CollabsibleCard!]", __args: { id: "ID" } },
    educationPressure: { __type: "[CollabsibleCard!]", __args: { id: "ID" } },
    user: { __type: "User", __args: { id: "ID" } },
    manageDevices: { __type: "[Device!]", __args: { id: "ID" } },
    nightmode: { __type: "Nightmode" },
  },
  mutation: {},
  subscription: {},
  Device: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    label: { __type: "String!" },
    title: { __type: "String!" },
    color: { __type: "String!" },
    data: { __type: "DeviceData!" },
  },
  Score: { __typename: { __type: "String!" }, score: { __type: "Int!" } },
  DeviceData: {
    __typename: { __type: "String!" },
    title: { __type: "String!" },
    type: { __type: "String!" },
    actual_value: { __type: "Float!" },
    max_value: { __type: "Float!" },
    min_value: { __type: "Float!" },
    difference: { __type: "Float!" },
    color: { __type: "String!" },
  },
  Brithness: { __typename: { __type: "String!" }, lamp: { __type: "String!" }, lampBrightness: { __type: "Int!" } },
  Badge: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    title: { __type: "String!" },
    description: { __type: "String!" },
    icon: { __type: "String!" },
    color: { __type: "String!" },
    isUnlock: { __type: "Boolean!" },
  },
  CollabsibleCard: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    title: { __type: "String!" },
    content: { __type: "String!" },
  },
  Notification: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    title: { __type: "String!" },
    date: { __type: "String!" },
  },
  Nightmode: {
    __typename: { __type: "String!" },
    nightMode: { __type: "Int!" },
    startTime: { __type: "String!" },
    endTime: { __type: "String!" },
  },
  User: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    full_name: { __type: "String!" },
    first_name: { __type: "String!" },
    last_name: { __type: "String!" },
    email: { __type: "String!" },
  },
} as const;

export interface Query {
  __typename: "Query" | undefined;
  device: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Device>;
  brithness?: Maybe<Brithness>;
  score?: Maybe<Score>;
  substancesCard: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<DeviceData>>;
  badgesFromGoodAir: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<Badge>>;
  badgesFromFeedback: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<Badge>>;
  badgesSpecial: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<Badge>>;
  notificationsToday: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<Notification>>;
  notificationsYesterday: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<Notification>>;
  educationCO2: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<CollabsibleCard>>;
  educationTemperature: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<CollabsibleCard>>;
  educationHumidity: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<CollabsibleCard>>;
  educationPressure: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<CollabsibleCard>>;
  user: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<User>;
  manageDevices: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Array<Device>>;
  nightmode?: Maybe<Nightmode>;
}

export interface Mutation {
  __typename: "Mutation" | undefined;
}

export interface Subscription {
  __typename: "Subscription" | undefined;
}

export interface Device {
  __typename: "Device" | undefined;
  id: ScalarsEnums["ID"];
  label: ScalarsEnums["String"];
  title: ScalarsEnums["String"];
  color: ScalarsEnums["String"];
  data: DeviceData;
}

export interface Score {
  __typename: "Score" | undefined;
  score: ScalarsEnums["Int"];
}

export interface DeviceData {
  __typename: "DeviceData" | undefined;
  title: ScalarsEnums["String"];
  type: ScalarsEnums["String"];
  actual_value: ScalarsEnums["Float"];
  max_value: ScalarsEnums["Float"];
  min_value: ScalarsEnums["Float"];
  difference: ScalarsEnums["Float"];
  color: ScalarsEnums["String"];
}

export interface Brithness {
  __typename: "Brithness" | undefined;
  lamp: ScalarsEnums["String"];
  lampBrightness: ScalarsEnums["Int"];
}

export interface Badge {
  __typename: "Badge" | undefined;
  id: ScalarsEnums["ID"];
  title: ScalarsEnums["String"];
  description: ScalarsEnums["String"];
  icon: ScalarsEnums["String"];
  color: ScalarsEnums["String"];
  isUnlock: ScalarsEnums["Boolean"];
}

export interface CollabsibleCard {
  __typename: "CollabsibleCard" | undefined;
  id: ScalarsEnums["ID"];
  title: ScalarsEnums["String"];
  content: ScalarsEnums["String"];
}

export interface Notification {
  __typename: "Notification" | undefined;
  id: ScalarsEnums["ID"];
  title: ScalarsEnums["String"];
  date: ScalarsEnums["String"];
}

export interface Nightmode {
  __typename: "Nightmode" | undefined;
  nightMode: ScalarsEnums["Int"];
  startTime: ScalarsEnums["String"];
  endTime: ScalarsEnums["String"];
}

export interface User {
  __typename: "User" | undefined;
  id: ScalarsEnums["ID"];
  full_name: ScalarsEnums["String"];
  first_name: ScalarsEnums["String"];
  last_name: ScalarsEnums["String"];
  email: ScalarsEnums["String"];
}

export interface SchemaObjectTypes {
  Query: Query;
  Mutation: Mutation;
  Subscription: Subscription;
  Device: Device;
  Score: Score;
  DeviceData: DeviceData;
  Brithness: Brithness;
  Badge: Badge;
  CollabsibleCard: CollabsibleCard;
  Notification: Notification;
  Nightmode: Nightmode;
  User: User;
}
export type SchemaObjectTypesNames =
  | "Query"
  | "Mutation"
  | "Subscription"
  | "Device"
  | "Score"
  | "DeviceData"
  | "Brithness"
  | "Badge"
  | "CollabsibleCard"
  | "Notification"
  | "Nightmode"
  | "User";

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {}
