import { reportStorageInterface } from "@/interfaces/reportStorageInterface";
import {
  DEFAULT_EVALUATION_VALUE,
  EVALUATION_FIELDS,
  PREFILL_PROFILES,
  PrefillLevel,
  RemarkField,
  getRemarks,
} from "@/lib/prefillData";

export function buildPrefill(level: PrefillLevel, prenom: string): reportStorageInterface {
  const profile = PREFILL_PROFILES[level];
  const remarks = getRemarks(prenom);
  const prefill: Record<string, unknown> = { ...profile.evaluations };

  for (const field of Object.keys(remarks) as RemarkField[]) {
    const list = [...remarks[field]];
    const [first] = list.splice(profile.firstRemark[field], 1);
    prefill[field] = [first, ...list];
    prefill[`${field}Selected`] = 0;
  }

  prefill.apprenticeshipJob = profile.apprenticeshipJob;
  prefill.adviceProject = profile.adviceProject;
  prefill.considerCandidate = profile.considerCandidate;
  prefill.bilanStage = profile.bilanStage;
  prefill.fillUpDate = new Date().toLocaleDateString("fr-CH");

  return prefill as reportStorageInterface;
}

export function withDefaultEvaluations(data: reportStorageInterface): reportStorageInterface {
  const completed: Record<string, unknown> = { ...data };
  for (const field of EVALUATION_FIELDS) {
    if (!completed[field]) {
      completed[field] = DEFAULT_EVALUATION_VALUE;
    }
  }
  return completed as reportStorageInterface;
}
