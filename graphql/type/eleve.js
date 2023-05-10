const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// add moyenne

const definitions = `
type Eleve {
  id: ID!
  prenom: String!
  nom: String!
  avis: [Avis]
}
`;

const query = `
eleves: [Eleve]
eleve(id: ID!): Eleve
`;

const mutation = `
ajouterEleve(prenom: String!, nom: String!): Eleve
modifierEleve(prenom: String!, nom: String!, id: ID!): Eleve
supprimerEleve(id: Int!): Eleve
`;

const resolvers = {
  eleve: ({ id }) => {
    return prisma.eleve.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        avis: true,
      },
    });
  },
  eleves: () => {
    return prisma.eleve.findMany({
      include: {
        avis: true,
      },
    });
  },
  ajouterEleve: ({ prenom, nom }) => {
    return prisma.eleve.create({
      data: {
        prenom: prenom,
        nom: nom,
      },
    });
  },
  modifierEleve: ({ prenom, nom, id }) => {
    return prisma.eleve.update({
      where: { id: parseInt(id) },
      data: {
        prenom: prenom,
        nom: nom,
      },
    });
  },
  supprimerEleve: ({ id }) => {
    return prisma.eleve.delete({
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
