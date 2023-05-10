const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type Cours {
  id: ID!
  nom_cours: String!
  id_professeur: ID!
  professeur : Professeur
  avis : Avis
  planning : Planning
}
`;

const query = `
courss: [Cours]
cours(id: ID!): Cours
`;

const mutation = `
ajouterCours(nom: String!, id_professeur: ID!): Cours
modifierCours(nom: String!, id_professeur: ID!, id_cours: ID!): Cours
supprimerCours(id_cours: Int!): Cours
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
  modifierCours: ({ nom, id_professeur, id_cours }) => {
    return prisma.cours.update({
      where: { id_cours: parseInt(id_cours) },
      data: {
        nom: nom,
        id_professeur: parseInt(id_professeur),
      },
    });
  },
  supprimerCours: ({ id_cours }) => {
    return prisma.cours.delete({
      where: {
        id_cours: parseInt(id_cours),
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
