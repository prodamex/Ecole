const { schema, resolvers } = require("./graphql/index.js");
const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

(async () => {
  const res = await prisma.eleve.create({
    data: {
      prenom: "test",
      nom: "test",
    },
  });
  console.log(res);
})();

app.listen(3000, () => console.log("server is running on port 3000..."));
