let { buildSchema } = require("graphql");

const cours = require("./type/cours.js");
const programme = require("./type/programme.js");
const typeprogramme = require("./type/typeprogramme.js");
const avis = require("./type/avis.js");
const planning = require("./type/planning.js");
const eleve = require("./type/eleve.js");
const professeur = require("./type/professeur.js");

const schema = buildSchema(`

    scalar Date,
    scalar Time,
    scalar DateTime,

    ${cours.definitions}
    ${programme.definitions}
    ${typeprogramme.definitions}
    ${avis.definitions}
    ${planning.definitions}
    ${eleve.definitions}
    ${professeur.definitions}

    type Query {
        ${cours.query}
        ${programme.query}
        ${typeprogramme.query}
        ${avis.query}
        ${planning.query}
        ${eleve.query}
        ${professeur.query}
    }

    type Mutation {
        ${cours.mutation}
        ${programme.mutation}
        ${typeprogramme.mutation}
        ${avis.mutation}
        ${planning.mutation}
        ${eleve.mutation}
        ${professeur.mutation}
    }
`);

const resolvers = {
  ...cours.resolvers,
  ...programme.resolvers,
  ...typeprogramme.resolvers,
  ...avis.resolvers,
  ...planning.resolvers,
  ...eleve.resolvers,
  ...professeur.resolvers,
};

module.exports = { schema, resolvers };
