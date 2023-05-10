const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type Professeur {
  id: ID!
  prenom: String!
  nom: String!
  cours: [Cours]
}
`;

const query = `
professeurs: [Professeur]
professeur(id: ID!): Professeur
`;

const mutation = `
ajouterProfesseur(prenom: String!, nom: String!): Professeur
modifierProfesseur(prenom: String!, nom: String!, id: ID!): Professeur
supprimerProfesseur(id: Int!): Professeur
`;

const resolvers = {
  professeur: ({ id }) => {
    return prisma.professeur.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        cours: true,
      },
    });
  },
  professeurs: () => {
    return prisma.professeur.findMany({
      include: {
        cours: true,
      },
    });
  },
  ajouterProfesseur: ({ prenom, nom }) => {
    return prisma.professeur.create({
      data: {
        prenom: prenom,
        nom: nom,
      },
    });
  },
  modifierProfesseur: ({ prenom, nom, id }) => {
    return prisma.professeur.update({
      where: { id: parseInt(id) },
      data: {
        prenom: prenom,
        nom: nom,
      },
    });
  },
  supprimerProfesseur: ({ id }) => {
    return prisma.professeur.delete({
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
