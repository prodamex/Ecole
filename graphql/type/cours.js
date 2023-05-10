const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type Cours {
  id: ID!
  nom: String!
  id_professeur: ID!
  professeur : Professeur
  avis : [Avis]
  planning : [Planning]
}
`;

const query = `
courss: [Cours]
cours(id: ID!): Cours
`;

const mutation = `
ajouterCours(nom: String!, id_professeur: ID!): Cours
modifierCours(nom: String!, id_professeur: ID!, id: ID!): Cours
supprimerCours(id: Int!): Cours
`;

const resolvers = {
  cours: ({ id }) => {
    return prisma.cours.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        avis: true,
        planning: true,
        professeur: true,
      },
    });
  },
  courss: () => {
    return prisma.cours.findMany({
      include: {
        avis: true,
        planning: true,
        professeur: true,
      },
    });
  },
  ajouterCours: ({ nom, id_professeur }) => {
    return prisma.cours.create({
      data: {
        nom: nom,
        id_professeur: parseInt(id_professeur),
      },
    });
  },
  modifierCours: ({ nom, id_professeur, id }) => {
    return prisma.cours.update({
      where: { id: parseInt(id) },
      data: {
        nom: nom,
        id_professeur: parseInt(id_professeur),
      },
    });
  },
  supprimerCours: ({ id }) => {
    return prisma.cours.delete({
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
