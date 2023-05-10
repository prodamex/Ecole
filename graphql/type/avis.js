const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const moyen = (aviss) => {
  const sum = aviss.reduce((a, b) => a + parseFloat(b.valeur), 0);
  const avg = sum / aviss.length || 0;
  return avg.toFixed(2);
};

const definitions = `
type Avis {
  id: ID!
  valeur: Float!
  id_eleve: ID!
  id_cours: ID!
  eleve: Eleve
  cours: Cours
}
`;

const query = `
aviss: [Avis]
avis( id: ID!): Avis
moyenEleve(id_eleve: ID!) : Float
moyenCours(id_cours: ID!) : Float
`;

const mutation = `
ajouterAvis(valeur: Float!, id_eleve: ID!,id_cours: ID! ): Avis
modifierAvis(valeur: Float!, id_eleve: ID!,id_cours: ID!, id: ID!): Avis
supprimerAvis(id: Int!): Avis
`;

const resolvers = {
  avis: ({ id }) => {
    return prisma.avis.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        eleve: true,
        cours: true,
      },
    });
  },
  aviss: () => {
    return prisma.avis.findMany({
      include: {
        eleve: true,
        cours: true,
      },
    });
  },
  ajouterAvis: ({ valeur, id_eleve, id_cours }) => {
    return prisma.avis.create({
      data: {
        valeur: parseFloat(valeur),
        id_eleve: parseInt(id_eleve),
        id_cours: parseInt(id_cours),
      },
    });
  },
  modifierAvis: ({ valeur, id_eleve, id_cours, id }) => {
    return prisma.avis.update({
      where: { id: parseInt(id) },
      data: {
        valeur: parseFloat(valeur),
        id_eleve: parseInt(id_eleve),
        id_cours: parseInt(id_cours),
      },
    });
  },
  supprimerAvis: ({ id }) => {
    return prisma.avis.delete({
      where: {
        id: parseInt(id),
      },
    });
  },
  moyenEleve: async ({ id_eleve }) => {
    const result = await prisma.eleve.findFirst({
      where: {
        id: parseInt(id_eleve),
      },
      include: {
        avis: true,
      },
    });
    return moyen(result.avis);
  },
  moyenCours: async ({ id_cours }) => {
    const result = await prisma.cours.findUnique({
      where: {
        id: parseInt(id_cours),
      },
      include: {
        avis: {
          where: { id_cours: parseInt(id_cours) },
        },
      },
    });
    return moyen(result.avis);
  },
};

module.exports = {
  definitions,
  query,
  mutation,
  resolvers,
};
