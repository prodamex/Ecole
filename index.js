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
  // const res = await prisma.cours.findUnique({
  //   where: {
  //     id: parseInt(1),
  //   },
  //   include: {
  //     avis: {
  //       where: { id_cours: 1 },
  //     },
  //   },
  // });
  // const sum = res.avis.reduce((a, b) => a + parseFloat(b.valeur), 0);
  // const avg = sum / res.avis.length || 0;
  // console.log(sum);
})();

app.listen(3000, () => console.log("server is running on port 3000..."));
