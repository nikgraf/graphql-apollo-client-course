# graphql-apollo-client-course

These are the code examples to the free video course [GraphQL Data in React with Apollo Client](https://egghead.io/courses/graphql-data-in-react-with-apollo-client)

In order to run the client you need to seed the DB and run the server beforehand.

```
cd server
npm install
npm run seed
npm run start:slow
```

or when using yarn

```
cd server
yarn
yarn seed
yarn start:slow
```

You can find the server located here: https://github.com/nikgraf/graphql-apollo-client-course/tree/master/server

The db stores two JSON files stored in `/tmp/recipes.json` and `/tmp/ingedients.json`.
