const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type Planning {
  id: ID!
  jour_planning: Date!
  debut_planning: Time!
  fin_planning: Time!
  id_cours: ID!
  cours: Cours
}
`;

const query = `
plannings: [Planning]
planning(id: ID!): Planning
`;

const mutation = `
ajouterPlanning(jour_planning: Date!, debut_planning: Time!, fin_planning: Time!, id_cours: ID!): Planning
modifierPlanning(id: ID!, jour_planning: Date!, debut_planning: Time!, fin_planning: Time!, id_cours: ID!): Planning
supprimerPlanning(id: Int!): Planning
`;

const resolvers = {
  planning: ({ id }) => {
    return prisma.planning.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        cours: true,
      },
    });
  },
  plannings: () => {
    return prisma.planning.findMany({
      include: {
        cours: true,
      },
    });
  },
  ajouterPlanning: ({
    jour_planning,
    debut_planning,
    fin_planning,
    id_cours,
  }) => {
    return prisma.planning.create({
      data: {
        debut_planning: new Date(debut_planning),
        fin_planning: new Date(fin_planning),
        jour_planning: new Date(jour_planning),
        id_cours: parseInt(id_cours),
      },
    });
  },
  modifierPlanning: ({
    jour_planning,
    debut_planning,
    fin_planning,
    id_cours,
    id,
  }) => {
    return prisma.planning.update({
      where: { id: parseInt(id) },
      data: {
        jour_planning: new Date(jour_planning),
        debut_planning: new Date(debut_planning),
        fin_planning: new Date(fin_planning),
        id_cours: parseInt(id_cours),
      },
    });
  },
  supprimerPlanning: ({ id }) => {
    return prisma.planning.delete({
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
