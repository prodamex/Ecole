const { schema, resolvers } = require("./graphql/index.js");
const { graphqlHTTP } = require("express-graphql");
const express = require("express");

const app = express();

app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(3000, () => console.log("server is running on port 3000..."));
