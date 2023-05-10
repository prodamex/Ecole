const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type Programme {
  id: ID!
  nom: String!
  apprentissage: Boolean!
  id_type_programme: Int!
}
`;

const query = `
programmes: [Programme]
programme(id: ID!): Programme
`;

const mutation = `
ajouterProgramme(nom: String!, apprentissage: Boolean!, id_type_programme: Int!): Programme
modifierProgramme(id: Int!, apprentissage: Boolean!, id_type_programme:Int!, nom: String): Programme
supprimerProgramme(id: Int!): Programme
`;

const resolvers = {
  programme: ({ id }) => {
    return prisma.programme.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        type_programme: true,
      },
    });
  },
  programmes: () => {
    return prisma.programme.findMany({
      include: {
        type_programme: true,
      },
    });
  },
  ajouterProgramme: ({ nom, apprentissage, id_type_programme }) => {
    return prisma.programme.create({
      data: {
        nom: nom,
        apprentissage: apprentissage,
        id_type_programme: parseInt(id_type_programme),
      },
    });
  },
  modifierProgramme: ({ id, nom, apprentissage, id_type_programme }) => {
    return prisma.programme.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nom: nom,
        apprentissage: apprentissage,
        id_type_programme: id_type_programme,
      },
    });
  },
  supprimerProgramme: ({ id }) => {
    return prisma.programme.delete({
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
