export type PrefillLevel = "really-good" | "good" | "less-good";

export const PREFILL_LEVELS: { value: PrefillLevel, label: string }[] = [
  { value: "really-good", label: "Très bien" },
  { value: "good", label: "Bien" },
  { value: "less-good", label: "Un peu moins bien" },
];

export const EVALUATION_FIELDS = [
  "firstImpression",
  "ponctuality",
  "selfConfidence",
  "dynamism",
  "concentrationSpan",
  "curiosity",
  "commitment",
  "interestLearning",
  "skillful",
  "fast",
  "careful",
  "methodical",
  "persevering",
  "attentive",
  "followInstructions",
  "comfortable",
  "helpful",
  "polite",
  "smiling",
  "confidentToAsk",
  "showInterest",
  "expressClairly",
] as const;

export type EvaluationField = typeof EVALUATION_FIELDS[number];

type EvaluationValue = "really-good" | "satisfying" | "to-upgrade" | "not-observed";

export const DEFAULT_EVALUATION_VALUE: EvaluationValue = "really-good";

export function getRemarks(prenom: string) {
  return {
    attitudeRemarks: [
      `${prenom} se prêtait volontiers aux différentes tâches avec motivation et persévérance.`,
      `${prenom} démontre une attitude mature et adaptée au contexte professionnel dès le début du stage.`,
      `${prenom} fait preuve d'une bonne capacité d'adaptation aux exigences du milieu de travail.`,
      `${prenom} adopte une posture professionnelle cohérente avec les attentes d'un environnement technique.`,
      `${prenom} contribue positivement à l'ambiance du stage par son attitude calme et mesurée.`,
    ],
    tasksExecRemarks: [
      `${prenom} participait bien et montrait de l'intérêt dans les différentes activités proposées.`,
      `${prenom} s'implique pleinement dans les activités, même face à des tâches complexes.`,
      `${prenom} montre une bonne précision dans l’exécution des tâches techniques qui lui sont confiées.`,
      `${prenom} a parfois besoin de reformuler les consignes mais parvient ensuite à les mettre en œuvre correctement.`,
      `${prenom} parvient à gérer plusieurs petites tâches successives sans se disperser.`,
    ],
    contactRemarks: [
      `${prenom} établit facilement le contact avec les autres et s’intègre bien au sein du groupe.`,
      `${prenom} adopte une attitude respectueuse et polie avec les collaborateurs et les apprentis.`,
      `${prenom} participe volontiers aux échanges et communique de manière claire lorsque cela est nécessaire.`,
      `${prenom} montre une bonne capacité d’écoute et tient compte des remarques qui lui sont adressées.`,
      `${prenom} peut encore gagner en assurance dans ses interactions, mais le contact est globalement satisfaisant.`,
    ],
    opinionRemarks: [
      `Le projet de formation de ${prenom} est très pertinent et en adéquation avec ses aptitudes.`,
      `Le projet de formation de ${prenom} semble cohérent, même si certains points restent à consolider.`,
      `L'informatique correspond bien à ${prenom}.`,
      `Le projet de formation dans ce domaine n’est pas encore suffisamment affirmé pour être recommandé sans réserve.`,
    ],
    advicesRemarks: [
      `De continuer à développer ses compétences par des cours, des projets personnels ou des activités parascolaires.`,
      `De renforcer ses bases scolaires, en particulier en mathématiques, logique et expression écrite, qui sont essentielles dans ce métier.`,
      `${prenom} devrait explorer différents métiers liés à l'informatique pour préciser son choix (informaticien, médiamaticien..)`,
    ],
    considerCandidatesRemarks: [
      `Oui, au vu de son comportement et de ses compétences, ${prenom} ferait un·e bon·ne apprenti·e.`,
      `Un engagement en formation pourrait être envisagé, mais nécessiterait encore une confirmation de la motivation de ${prenom} sur la durée.`,
      `${prenom} a déjà de bonnes connaissances en informatique.`,
      `Non, ${prenom} devrait d’abord développer davantage ses compétences et sa posture professionnelle avant de pouvoir être retenu·e pour une formation.`,
    ],
  };
}

export type RemarkField = keyof ReturnType<typeof getRemarks>;

interface PrefillProfile {
  evaluations: Record<EvaluationField, EvaluationValue>,
  firstRemark: Record<RemarkField, number>,
  apprenticeshipJob: string,
  adviceProject: string,
  considerCandidate: string,
  bilanStage: string,
}

function evaluations(
  base: EvaluationValue,
  exceptionValue: EvaluationValue = base,
  exceptions: EvaluationField[] = [],
): Record<EvaluationField, EvaluationValue> {
  return Object.fromEntries(
    EVALUATION_FIELDS.map((field) => [field, exceptions.includes(field) ? exceptionValue : base]),
  ) as Record<EvaluationField, EvaluationValue>;
}

export const PREFILL_PROFILES: Record<PrefillLevel, PrefillProfile> = {
  "really-good": {
    evaluations: evaluations("really-good"),
    firstRemark: {
      attitudeRemarks: 0,
      tasksExecRemarks: 1,
      contactRemarks: 0,
      opinionRemarks: 0,
      advicesRemarks: 0,
      considerCandidatesRemarks: 2,
    },
    apprenticeshipJob: "adequate",
    adviceProject: "find-apprenticeship",
    considerCandidate: "maybe",
    bilanStage: "no",
  },
  "good": {
    evaluations: evaluations("really-good", "satisfying", [
      "selfConfidence",
      "concentrationSpan",
      "fast",
      "methodical",
      "confidentToAsk",
      "expressClairly",
    ]),
    firstRemark: {
      attitudeRemarks: 2,
      tasksExecRemarks: 0,
      contactRemarks: 2,
      opinionRemarks: 2,
      advicesRemarks: 0,
      considerCandidatesRemarks: 2,
    },
    apprenticeshipJob: "adequate",
    adviceProject: "find-apprenticeship",
    considerCandidate: "maybe",
    bilanStage: "no",
  },
  "less-good": {
    evaluations: evaluations("satisfying", "really-good", [
      "ponctuality",
      "interestLearning",
      "careful",
      "attentive",
      "helpful",
      "polite",
    ]),
    firstRemark: {
      attitudeRemarks: 4,
      tasksExecRemarks: 3,
      contactRemarks: 4,
      opinionRemarks: 1,
      advicesRemarks: 1,
      considerCandidatesRemarks: 1,
    },
    apprenticeshipJob: "adequate",
    adviceProject: "find-apprenticeship",
    considerCandidate: "maybe",
    bilanStage: "no",
  },
};
