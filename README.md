# Luftio Mobile app

## Configure

Set the correct LUFTIO_GRAPHQL_ENDPOINT URL in `.env` and also in `src/config/ApolloClient.ts` (Expo has issues loading .env files)

## Getting started

```bash
$ npm install
$ npm run generate      # Update GraphQL
$ npm start
```

## Publish project

```bash
$ expo publish
```

## Other

```bash
# clear the React Native packager's cache
$ npm start -- --reset-cache
```
