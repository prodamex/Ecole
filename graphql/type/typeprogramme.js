const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
    type typeProgramme {
        id: ID!
        nom: String!
        programme: [Programme]
    }
`;

const query = `
typeProgrammes: [typeProgramme]
typeProgramme(id: ID!): typeProgramme
`;

const mutation = `
ajouterTypeProgramme(nom: String!): typeProgramme
modifierTypeProgramme(id: Int!, nom: String!): typeProgramme
supprimerTypeProgramme(id: Int!): typeProgramme
`;

const resolvers = {
  typeProgramme: ({ id }) => {
    return prisma.typeProgramme.findUnique({
      where: {
        id: parseInt(id),
      },
      include: { programme: true },
    });
  },
  typeProgrammes: () => {
    return prisma.typeProgramme.findMany({
      include: { programme: true },
    });
  },
  ajouterTypeProgramme: ({ nom }) => {
    return prisma.typeProgramme.create({
      data: {
        nom: nom,
      },
    });
  },
  modifierTypeProgramme: ({ id, nom }) => {
    return prisma.typeProgramme.update({
      where: { id: parseInt(id) },
      data: { nom: nom },
    });
  },
  supprimerTypeProgramme: ({ id }) => {
    return prisma.typeProgramme.delete({
      where: {
        id: parseInt(id),
      },
    });
  },
};

module.exports = {
  definitions,
  query,
  mutation,
  resolvers,
};
