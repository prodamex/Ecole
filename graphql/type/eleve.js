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
compteEleveParTypeProgramme(idProgramType: ID!): Int
compteEleveParProgramme(idProgram: ID!): Int
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
  compteEleveParTypeProgramme: async ({ idProgramType }) => {
    const result = await prisma.programtype.findUnique({
      where: { idProgramType: parseInt(idProgramType) },
      include: {
        program: {
          include: {
            programgroup: {
              include: {
                eleve: true,
              },
            },
          },
        },
      },
    });
    return result.program.reduce((acc, pr) => {
      return (
        acc +
        pr.programgroup.reduce((acc2, prg) => {
          return acc2 + (prg.eleve ? prg.eleve.length : 0);
        }, 0)
      );
    }, 0);
  },
  compteEleveParProgramme: async ({ idProgram }) => {
    const result = await prisma.program.findUnique({
      where: { idProgram: parseInt(idProgram) },
      include: {
        programgroup: {
          include: {
            eleve: true,
          },
        },
      },
    });
    return result.programgroup.reduce((acc, prg) => {
      return acc + (prg.eleve ? prg.eleve.length : 0);
    }, 0);
  },
};

module.exports = {
  definitions,
  query,
  mutation,
  resolvers,
};
