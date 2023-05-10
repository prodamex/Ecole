let { buildSchema } = require("graphql");

const schema = buildSchema(`
`);

const resolvers = {};

module.exports = { schema, resolvers };
